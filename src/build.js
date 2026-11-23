// Builds <talk>.index.html from data/<talk>/deck.toml and data/<talk>/slides/*.md.
//   node src/build.js            all talks in data/
//   node src/build.js fediverse  a single talk
//
// deck.toml – talk metadata and slide order; the title slide is generated from it:
//   title    = "Der digitale Euro"
//   subtitle = "…"                              (optional)
//   event    = "DI.DAY · 6. Dezember 2026 · Ludwigsburg"  (optional)
//   duration = 26                               (optional: target minutes for the presenter timer)
//   notes    = "…"                              (optional: speaker notes for the title slide)
//   theme    = "eu"                             (optional: eu | gruene | did | eurosky, default eu; Shift+E/G/D/K switch live)
//   link     = "https://github.com/…"           (optional: link shown bottom left on the title slide)
//   qr       = "https://…"                      (optional: QR code on the title slide, see qr: below)
//   listed   = false                            (optional: hide the talk from index.html, e.g. the sample deck)
//   slides   = ["kapitel-problem", "vier-probleme"]   (file names in slides/, without .md)
//
// slides/<name>.md – one slide per file, starting with a header block:
//   ---
//   layout: default        (section|agenda|default|statement|quote|timeline|procon|cards|table|image|diagram|code|sources|transparency)
//                           quote: a > blockquote (**bold** = highlight), the paragraph after it is the attribution
//                           diagram: a ```mermaid block (rendered in the browser, theme colors); any other text
//                           besides the heading goes into a column right of the diagram
//                           code: a ``` block (```python, ```bash, ```cpp, ```rust …, highlighted at build time),
//                           other text goes into a column right of it, like diagram.
//                           ```algo Caption: pseudocode as in LaTeX (algorithmic): numbered lines, bold keywords
//                           (English or German), <- != <= >= become ← ≠ ≤ ≥, comments after ▷ or //
//                           agenda lists the headings of all section slides automatically;
//                           sources and transparency: ### headings start columns (prompt as ``` block)
//                           cards: each ### heading starts a card, side by side (e.g. apps, examples);
//                           logo on top if data/<talk>/img/logos/<slug of the ### heading>.svg|png|webp exists
//   source: Drs. 21/7319   (short source for the footer, inline Markdown allowed)
//   steps: true            (reveal list items, or procon columns and cards, one by one)
//   chapter: Short name    (section only: chapter name for the footer, defaults to the heading)
//   image: img/x.png       (image only, relative to data/<talk>/) · alt: … · credit: …
//   logos: BMDS, SPRIND    (row of small logos at the bottom; file data/<talk>/img/logos/<slug>.svg|png|webp,
//                           e.g. "Common Codes" -> common-codes.svg; a missing file shows a placeholder)
//   qr: https://…          (QR code with the URL below it on the right; the text area gets narrower)
//   ---
// Everything after a line "Note:" is speaker notes.
// Files in slides/ that deck.toml does not list are skipped with a warning (parked slides).
'use strict';
const fs = require('fs');
const path = require('path');
const { marked } = require('./vendor/marked.min.js');
const TOML = require('./vendor/smol-toml.cjs');
const qrcode = require('./vendor/qrcode-generator.js');
qrcode.stringToBytes = qrcode.stringToBytesFuncs['UTF-8']; // default only handles ASCII
const hljs = require('./vendor/highlight.min.js'); // build time only: decks get plain <span class="hljs-…">

// Pseudocode in the style of LaTeX algorithmic: ```algo blocks
hljs.registerLanguage('algo', () => ({
  case_insensitive: true,
  unicodeRegex: true,
  keywords: {
    $pattern: /\p{L}+/u,
    keyword: ['procedure', 'function', 'end', 'if', 'then', 'else', 'for', 'each', 'all', 'to', 'downto', 'do', 'while',
      'repeat', 'until', 'return', 'and', 'or', 'not', 'in', 'break', 'continue',
      'prozedur', 'funktion', 'ende', 'wenn', 'dann', 'sonst', 'für', 'alle', 'jedes', 'bis', 'solange', 'wiederhole',
      'gib', 'zurück', 'und', 'oder', 'nicht'],
    literal: ['true', 'false', 'nil', 'wahr', 'falsch'],
  },
  contains: [
    hljs.COMMENT(/▷|\/\//, /$/),
    { className: 'title', begin: /(?<=\b(?:procedure|function|prozedur|funktion)\s+)\p{L}[\p{L}\d_]*/u },
    hljs.C_NUMBER_MODE,
  ],
}));

const ROOT = path.join(__dirname, '..');
const DATA = path.join(ROOT, 'data');
// ponytail: one author and license for all talks; move into deck.toml if that ever differs
const LICENSE_URL = 'https://creativecommons.org/licenses/by/4.0/deed.de';
const LICENSE_LINE = `<p class="license">Folien: krahlos · <a href="${LICENSE_URL}">CC BY 4.0</a></p>`;

const THEMES = ['eu', 'gruene', 'did', 'eurosky']; // each has src/<name>.style.css

// Code blocks: highlighted at build time; ```algo becomes a numbered LaTeX-style algorithm box.
let algoNo = 0; // per talk, reset in build()
marked.use({ renderer: {
  code({ text, lang = '' }) {
    const [language = '', ...caption] = lang.trim().split(/\s+/);
    if (language === 'algo') {
      const src = text.replace(/<-/g, '←').replace(/!=/g, '≠').replace(/<=/g, '≤').replace(/>=/g, '≥');
      const lines = hljs.highlight(src, { language }).value.split('\n').map(l => `<span class="ln">${l}</span>`);
      return `<figure class="algo"><figcaption><b>Algorithmus ${++algoNo}</b> ${esc(caption.join(' '))}</figcaption>` +
        `<pre><code>${lines.join('')}</code></pre></figure>\n`;
    }
    const code = hljs.getLanguage(language) ? hljs.highlight(text, { language }).value : esc(text);
    return `<pre><code class="hljs${language ? ` language-${esc(language)}` : ''}">${code}</code></pre>\n`;
  },
} });

const esc = (s = '') => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const headingText = body => (body.match(/^#{1,3} (.+)$/m) || [, ''])[1].trim();

// One slide file: header block of "key: value" lines between two ---, then body, then "Note:".
function parseSlide(md, file) {
  const m = md.replace(/\r\n/g, '\n').match(/^---\n((?:[\w-]+:.*\n)*)---\n([\s\S]*)$/);
  if (!m) throw new Error(`${file}: must start with a ---/--- header block`);
  const meta = {};
  for (const line of m[1].split('\n').filter(Boolean)) {
    const k = line.indexOf(':');
    meta[line.slice(0, k).trim()] = line.slice(k + 1).trim();
  }
  const [body, notes = ''] = m[2].split(/^Note:\s*$/m);
  return { meta, body: body.trim(), notes: notes.trim() };
}

function titleSlide(deck) {
  const body = [`# ${deck.title}`, deck.subtitle && `## ${deck.subtitle}`, deck.event].filter(Boolean).join('\n\n');
  return { meta: { layout: 'title', qr: deck.qr }, body, notes: (deck.notes || '').trim() };
}

const displayUrl = url => url.replace(/^https?:\/\//, '').replace(/\/$/, '');

// QR code as inline SVG, generated at build time: no runtime JS, sharp at any size.
// Always black on white (quiet zone included) so phones can scan it in every theme.
function qrBlock(url) {
  const qr = qrcode(0, 'M');
  qr.addData(url);
  qr.make();
  return `<figure class="qr">${qr.createSvgTag({ cellSize: 1, margin: 2, scalable: true })}` +
    `<figcaption>${esc(displayUrl(url))}</figcaption></figure>`;
}

function loadDeck(talk) {
  const dir = path.join(DATA, talk);
  const deck = TOML.parse(fs.readFileSync(path.join(dir, 'deck.toml'), 'utf8'));
  if (typeof deck.title !== 'string' || !Array.isArray(deck.slides)) {
    throw new Error(`${talk}/deck.toml: needs title = "…" and slides = [ … ]`);
  }
  deck.theme ??= 'eu';
  if (!THEMES.includes(deck.theme)) throw new Error(`${talk}/deck.toml: theme must be one of ${THEMES.join(', ')}`);
  const slideDir = path.join(dir, 'slides');
  const slides = deck.slides.map(name => {
    const file = path.join(slideDir, `${name}.md`);
    if (!fs.existsSync(file)) throw new Error(`${talk}/deck.toml: slide "${name}" not found (${path.relative(ROOT, file)})`);
    return parseSlide(fs.readFileSync(file, 'utf8'), path.relative(ROOT, file));
  });
  const listed = new Set(deck.slides);
  const unused = fs.existsSync(slideDir)
    ? fs.readdirSync(slideDir).filter(f => f.endsWith('.md') && !listed.has(f.slice(0, -3)))
    : [];
  if (unused.length) console.warn(`${talk}: not in deck.toml, skipped: ${unused.join(', ')}`);
  return { deck, slides: [titleSlide(deck), ...slides] };
}

function content(s, talk, chapters) {
  const L = s.meta.layout;
  if (L === 'agenda') {
    const items = chapters.map((c, i) => `<li><span class="no">${String(i + 1).padStart(2, '0')}</span>${esc(c)}</li>`);
    return marked.parse(s.body) + `<ol class="agenda">${items.join('')}</ol>`;
  }
  // ### headings split the body into columns: procon, cards, transparency, and grouped sources
  if (L === 'procon' || L === 'cards' || L === 'transparency' || (L === 'sources' && /^### /m.test(s.body))) {
    const [head, ...cols] = s.body.split(/^(?=### )/m);
    // cards: logo above the heading when data/<talk>/img/logos/<slug of heading> exists
    // (an empty spacer of the same height when only some cards have a logo, so the headings line up)
    const files = cols.map(c => L === 'cards' && logoFile(headingText(c), talk));
    const logo = (c, i) => files[i] ? `<img class="card-logo" src="${esc(files[i])}" alt="">`
      : files.some(Boolean) ? '<span class="card-logo"></span>' : '';
    return marked.parse(head) + '<div class="cols">' + cols.map((c, i) => `<div class="col">${logo(c, i)}${marked.parse(c)}</div>`).join('') + '</div>';
  }
  if (L === 'image') {
    const src = s.meta.image && (/^[a-z]+:/i.test(s.meta.image) ? s.meta.image : `data/${talk}/${s.meta.image}`);
    const img = src ? `<img src="${esc(src)}" alt="${esc(s.meta.alt)}">` : '<div class="img-placeholder">Bild folgt</div>';
    const credit = s.meta.credit ? `<figcaption>${marked.parseInline(s.meta.credit)}</figcaption>` : '';
    return `<figure>${img}${credit}</figure><div class="text">${marked.parse(s.body)}</div>`;
  }
  // diagram and code: heading on top, then the first ``` block, other text in a column right of it
  if (L === 'diagram' || L === 'code') {
    const m = s.body.match(L === 'diagram' ? /^```mermaid\n([\s\S]*?)^```$/m : /^```.*\n[\s\S]*?^```$/m);
    const heading = (s.body.match(/^#{1,3} .+$/m) || [''])[0];
    const text = s.body.replace(m ? m[0] : '', '').replace(heading, '').trim();
    const main = !m ? `<div class="img-placeholder">${L === 'diagram' ? 'Diagramm' : 'Code'} folgt</div>`
      : L === 'diagram' ? `<pre class="mermaid">${esc(m[1])}</pre>` : marked.parse(m[0]);
    return marked.parse(heading) + `<div class="split">${main}${text ? `<div class="text">${marked.parse(text)}</div>` : ''}</div>`;
  }
  return marked.parse(s.body);
}

const slugify = s => s.toLowerCase().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
  .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// "logos: A, B" -> row of logo images, or a labelled placeholder until the file exists.
const logoFile = (name, talk) => ['svg', 'png', 'webp'].map(ext => `data/${talk}/img/logos/${slugify(name)}.${ext}`)
  .find(f => fs.existsSync(path.join(ROOT, f)));

function logoRow(list, talk, missing) {
  const items = list.split(',').map(s => s.trim()).filter(Boolean).map(name => {
    const file = logoFile(name, talk);
    if (file) return `<img src="${esc(file)}" alt="${esc(name)}">`;
    missing.add(`${slugify(name)} (${name})`);
    return `<span class="logo-placeholder">${esc(name)}</span>`;
  });
  return `<div class="logos">${items.join('')}</div>`;
}

function build(talk) {
  const { deck, slides } = loadDeck(talk);
  const missingLogos = new Set();
  algoNo = 0;
  // Agenda: the headings of all section slides, in order
  const chapters = slides.filter(s => s.meta.layout === 'section').map(s => headingText(s.body));

  let chapter = '', chapterNo = 0;
  const html = slides.map((s, i) => {
    const L = s.meta.layout || 'default';
    let pre = '';
    if (L === 'section') {
      chapterNo++;
      chapter = s.meta.chapter || headingText(s.body);
      pre = `<div class="no">${String(chapterNo).padStart(2, '0')}</div>`;
    }
    const footer = L === 'title' || L === 'section' ? '' :
      `<footer><span>${chapterNo ? `${chapterNo} · ${esc(chapter)}` : ''}</span>` +
      `<span>${s.meta.source ? marked.parseInline(s.meta.source) : ''}</span>` +
      `<span>${i + 1} / ${slides.length}</span></footer>`;
    const notes = s.notes ? `<aside class="notes">${marked.parse(s.notes)}</aside>` : '';
    const steps = s.meta.steps === 'true' ? ' data-steps' : '';
    const qr = s.meta.qr ? qrBlock(s.meta.qr) : '';
    // GitHub links get the official Invertocat (allowed "to link to your GitHub project", see LICENSES/)
    const icon = /^https:\/\/github\.com\//.test(deck.link || '') ? '<img src="src/img/github-invertocat-black.svg" alt="GitHub">' : '';
    const link = L === 'title' && deck.link
      ? `<p class="title-link"><a href="${esc(deck.link)}">${icon}${esc(displayUrl(deck.link))}</a></p>` : '';
    return `<section class="slide layout-${L}${qr ? ' has-qr' : ''}"${steps}>\n<div class="content">${pre}${content(s, talk, chapters)}${s.meta.logos ? logoRow(s.meta.logos, talk, missingLogos) : ''}${L === 'sources' ? LICENSE_LINE : ''}</div>\n${qr}${link}${footer}${notes}</section>`;
  }).join('\n\n');

  const out = `<!doctype html>
<html lang="de" data-theme="${deck.theme}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(deck.title)}</title>
<meta name="author" content="krahlos">
<link rel="license" href="${LICENSE_URL}">
<link rel="stylesheet" href="src/style.css">
${THEMES.map(t => `<link rel="stylesheet" href="src/${t}.style.css">`).join('\n')}
</head>
<body data-duration="${Number(deck.duration) || 0}">
<!-- Generated by src/build.js from data/${talk}/. Do not edit by hand. -->
<div class="deck">
${html}
</div>
<div class="progress"><span></span></div>
${slides.some(s => s.meta.layout === 'diagram') ? '<script src="src/vendor/mermaid.min.js"></script>\n' : ''}<script src="src/deck.js"></script>
</body>
</html>
`;
  fs.writeFileSync(path.join(ROOT, `${talk}.index.html`), out);
  console.log(`${talk}.index.html: ${slides.length} slides`);
  if (missingLogos.size) console.warn(`${talk}: logo placeholders (add data/${talk}/img/logos/<name>.svg): ${[...missingLogos].join(', ')}`);
}

// index.html: overview of all listed talks with at least one slide besides the title (stubs stay hidden).
// Always built from every deck, so a single-talk build keeps the list complete.
function buildIndex(all) {
  const bar = theme => (fs.readFileSync(path.join(ROOT, 'src', `${theme}.style.css`), 'utf8').match(/--bar:\s*(#[0-9a-f]{3,8})/i) || [, '#003399'])[1];
  const items = all.map(talk => ({ talk, ...loadDeck(talk) }))
    .filter(({ deck, slides }) => deck.listed !== false && slides.length > 1)
    .map(({ talk, deck, slides }) => {
      const meta = [`${slides.length} Folien`, Number(deck.duration) ? `ca. ${deck.duration} Minuten` : ''].filter(Boolean).join(' · ');
      return `    <li style="--bar: ${bar(deck.theme)}">
      <a href="${talk}.index.html">
        <h2>${esc(deck.title)}</h2>${deck.subtitle ? `\n        <p class="sub">${esc(deck.subtitle)}</p>` : ''}${deck.event ? `\n        <p class="meta">${esc(deck.event)}</p>` : ''}
        <p class="meta">${meta}</p>
      </a>
    </li>`;
    });
  const out = `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Vorträge zum DI.DAY</title>
<meta name="author" content="krahlos">
<link rel="license" href="${LICENSE_URL}">
<style>
  @font-face { font-family: "Atkinson Hyperlegible"; font-weight: 400; src: url(src/fonts/atkinson-hyperlegible-latin-400-normal.woff2) format("woff2"); }
  @font-face { font-family: "Atkinson Hyperlegible"; font-weight: 700; src: url(src/fonts/atkinson-hyperlegible-latin-700-normal.woff2) format("woff2"); }
  :root { --accent: #003399; --ink: #161a22; --muted: #555d6b; --rule: #d5dae3; --panel: #f3f5f8; }
  body { margin: 0; font: 18px/1.5 "Atkinson Hyperlegible", system-ui, sans-serif; color: var(--ink); background: #fff; }
  main { max-width: 860px; margin: 0 auto; padding: 64px 24px; }
  a { color: var(--accent); }
  header h1 { font-size: 44px; line-height: 1.1; margin: 0 0 12px; }
  header h1::after { content: ""; display: block; width: 64px; height: 6px; background: var(--accent); margin-top: 20px; }
  header p { color: var(--muted); margin: 0 0 40px; max-width: 60ch; }
  ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 20px; }
  li a { display: block; padding: 24px 28px; background: var(--panel); border-left: 8px solid var(--bar); color: inherit; text-decoration: none; }
  li a:hover, li a:focus-visible { outline: 3px solid var(--accent); outline-offset: 2px; }
  h2 { font-size: 26px; margin: 0 0 4px; color: var(--accent); }
  .sub { margin: 0 0 12px; }
  .meta { margin: 0; color: var(--muted); font-size: 16px; }
  footer { margin-top: 48px; padding-top: 20px; border-top: 1px solid var(--rule); color: var(--muted); font-size: 15px; }
</style>
</head>
<body>
<!-- Generated by src/build.js from data/*/deck.toml. Do not edit by hand. -->
<main>
  <header>
    <h1>Vorträge zum DI.DAY</h1>
    <p>Folien zu europäischen Digitalthemen für den <a href="https://di.day">Digital Independence Day</a>. Jeder Vortrag ist eine einzelne Seite: mit den Pfeiltasten blättern, sie funktioniert auch offline.</p>
  </header>
  <ul>
${items.join('\n')}
  </ul>
  <footer>
    Folien unter <a href="${LICENSE_URL}">CC BY 4.0</a>, Logos und Bilder Dritter ausgenommen (siehe <a href="https://github.com/krahlos/did-slides/blob/main/REUSE.toml">REUSE.toml</a>).
    Quellcode und alle Quellen: <a href="https://github.com/krahlos/did-slides">github.com/krahlos/did-slides</a>.
  </footer>
</main>
</body>
</html>
`;
  fs.writeFileSync(path.join(ROOT, 'index.html'), out);
  console.log(`index.html: ${items.length} talks`);
}

const all = fs.readdirSync(DATA).filter(d => fs.existsSync(path.join(DATA, d, 'deck.toml')));
const talks = process.argv.slice(2);
(talks.length ? talks : all).forEach(build);
buildIndex(all);

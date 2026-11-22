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
//   theme    = "eu"                             (optional: eu | gruene | did, default eu; Shift+E/G/D switch live)
//   link     = "https://github.com/…"           (optional: link shown bottom left on the title slide)
//   qr       = "https://…"                      (optional: QR code on the title slide, see qr: below)
//   slides   = ["kapitel-problem", "vier-probleme"]   (file names in slides/, without .md)
//
// slides/<name>.md – one slide per file, starting with a header block:
//   ---
//   layout: default        (section|agenda|default|statement|timeline|procon|table|image|sources|transparency)
//                           agenda lists the headings of all section slides automatically;
//                           sources and transparency: ### headings start columns (prompt as ``` block)
//   source: Drs. 21/7319   (short source for the footer, inline Markdown allowed)
//   steps: true            (reveal list items, or procon columns, one by one)
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

const ROOT = path.join(__dirname, '..');
const DATA = path.join(ROOT, 'data');
// ponytail: one author and license for all talks; move into deck.toml if that ever differs
const LICENSE_URL = 'https://creativecommons.org/licenses/by/4.0/deed.de';
const LICENSE_LINE = `<p class="license">Folien: krahlos · <a href="${LICENSE_URL}">CC BY 4.0</a></p>`;

const THEMES = ['eu', 'gruene', 'did']; // each has src/<name>.style.css

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
  // ### headings split the body into columns: procon, transparency, and grouped sources
  if (L === 'procon' || L === 'transparency' || (L === 'sources' && /^### /m.test(s.body))) {
    const [head, ...cols] = s.body.split(/^(?=### )/m);
    return marked.parse(head) + '<div class="cols">' + cols.map(c => `<div class="col">${marked.parse(c)}</div>`).join('') + '</div>';
  }
  if (L === 'image') {
    const src = s.meta.image && (/^[a-z]+:/i.test(s.meta.image) ? s.meta.image : `data/${talk}/${s.meta.image}`);
    const img = src ? `<img src="${esc(src)}" alt="${esc(s.meta.alt)}">` : '<div class="img-placeholder">Bild folgt</div>';
    const credit = s.meta.credit ? `<figcaption>${marked.parseInline(s.meta.credit)}</figcaption>` : '';
    return `<figure>${img}${credit}</figure><div class="text">${marked.parse(s.body)}</div>`;
  }
  return marked.parse(s.body);
}

const slugify = s => s.toLowerCase().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
  .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// "logos: A, B" -> row of logo images, or a labelled placeholder until the file exists.
function logoRow(list, talk, missing) {
  const items = list.split(',').map(s => s.trim()).filter(Boolean).map(name => {
    const base = `data/${talk}/img/logos/${slugify(name)}`;
    const file = ['svg', 'png', 'webp'].map(ext => `${base}.${ext}`).find(f => fs.existsSync(path.join(ROOT, f)));
    if (file) return `<img src="${esc(file)}" alt="${esc(name)}">`;
    missing.add(`${slugify(name)} (${name})`);
    return `<span class="logo-placeholder">${esc(name)}</span>`;
  });
  return `<div class="logos">${items.join('')}</div>`;
}

function build(talk) {
  const { deck, slides } = loadDeck(talk);
  const missingLogos = new Set();
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
<script src="src/deck.js"></script>
</body>
</html>
`;
  fs.writeFileSync(path.join(ROOT, `${talk}.index.html`), out);
  console.log(`${talk}.index.html: ${slides.length} slides`);
  if (missingLogos.size) console.warn(`${talk}: logo placeholders (add data/${talk}/img/logos/<name>.svg): ${[...missingLogos].join(', ')}`);
}

const talks = process.argv.slice(2);
(talks.length ? talks : fs.readdirSync(DATA).filter(d => fs.existsSync(path.join(DATA, d, 'deck.toml')))).forEach(build);

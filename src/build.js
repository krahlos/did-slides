// Baut <thema>.index.html aus data/<thema>/slides.md.
//   node src/build.js            alle Themen in data/
//   node src/build.js fediverse  nur ein Thema
//
// Jede Folie beginnt mit einem Kopf:
//   ---
//   layout: default        (title|section|default|statement|timeline|procon|table|image|sources)
//   source: Drs. 21/7319   (Kurzquelle für die Fußzeile, Inline-Markdown erlaubt)
//   steps: true            (Punkte bzw. Spalten einzeln aufdecken)
//   chapter: Kurzname      (nur section: Kapitelname für die Fußzeile, sonst die Überschrift)
//   image: img/x.png       (nur image, relativ zu data/<thema>/) · alt: … · credit: …
//   duration: 26           (nur erste Folie: Sollzeit in Minuten für den Timer)
//   ---
// Alles nach einer Zeile "Note:" sind Sprechernotizen.
'use strict';
const fs = require('fs');
const path = require('path');
const { marked } = require('./vendor/marked.min.js');

const ROOT = path.join(__dirname, '..');
const DATA = path.join(ROOT, 'data');

const esc = (s = '') => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const headingText = body => (body.match(/^#{1,3} (.+)$/m) || [, ''])[1].trim();

function parse(md) {
  // ponytail: Kopf = Zeilen "key: value" zwischen zwei ---; ein --- mit "x: y" direkt darunter im Text würde als Kopf gelesen
  const parts = md.replace(/\r\n/g, '\n').split(/^---\n((?:[\w-]+:.*\n)*)---\n/m);
  const slides = [];
  for (let i = 1; i < parts.length; i += 2) {
    const meta = {};
    for (const line of parts[i].split('\n').filter(Boolean)) {
      const k = line.indexOf(':');
      meta[line.slice(0, k).trim()] = line.slice(k + 1).trim();
    }
    const [body, notes = ''] = parts[i + 1].split(/^Note:\s*$/m);
    slides.push({ meta, body: body.trim(), notes: notes.trim() });
  }
  return slides;
}

function content(s, talk) {
  const L = s.meta.layout;
  if (L === 'procon') {
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

function build(talk) {
  const slides = parse(fs.readFileSync(path.join(DATA, talk, 'slides.md'), 'utf8'));
  if (!slides.length) throw new Error(`${talk}: keine Folien – beginnt slides.md mit einem ---/--- Kopf?`);

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
    return `<section class="slide layout-${L}"${steps}>\n<div class="content">${pre}${content(s, talk)}</div>\n${footer}${notes}</section>`;
  }).join('\n\n');

  const title = slides[0].meta.title || headingText(slides[0].body) || talk;
  const duration = parseInt(slides[0].meta.duration, 10) || 0;
  const out = `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<link rel="stylesheet" href="src/style.css">
</head>
<body data-duration="${duration}">
<!-- Erzeugt von src/build.js aus data/${talk}/slides.md. Nicht von Hand bearbeiten. -->
<div class="deck">
${html}
</div>
<div class="progress"><span></span></div>
<script src="src/deck.js"></script>
</body>
</html>
`;
  fs.writeFileSync(path.join(ROOT, `${talk}.index.html`), out);
  console.log(`${talk}.index.html: ${slides.length} Folien`);
}

const talks = process.argv.slice(2);
(talks.length ? talks : fs.readdirSync(DATA).filter(d => fs.existsSync(path.join(DATA, d, 'slides.md')))).forEach(build);

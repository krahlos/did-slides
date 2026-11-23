<div align="center">

# did-slides

[![checks](https://github.com/krahlos/did-slides/actions/workflows/prek.yml/badge.svg?branch=main)](https://github.com/krahlos/did-slides/actions/workflows/prek.yml)
[![links](https://github.com/krahlos/did-slides/actions/workflows/links.yml/badge.svg?branch=main)](https://github.com/krahlos/did-slides/actions/workflows/links.yml)
[![REUSE](https://img.shields.io/badge/REUSE-compliant-green.svg)](https://reuse.software)

[![Content: CC BY 4.0](https://img.shields.io/badge/content-CC%20BY%204.0-lightgrey.svg)](LICENSES/CC-BY-4.0.txt)
[![Code: EUPL-1.2](https://img.shields.io/badge/code-EUPL--1.2-blue.svg)](LICENSES/EUPL-1.2.txt)
[![prek](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/j178/prek/master/docs/assets/badge-v0.json)](https://github.com/j178/prek)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://www.conventionalcommits.org)

_Offline HTML slide decks for [Digital Independence Day](https://di.day) talks on European
digital topics. Double-click, present, pass on._

</div>

---

## Talks

Online: <https://krahlos.github.io/did-slides/> (published from `main` via GitHub Pages).

| Talk | Deck |
| --- | --- |
| The EUDI Wallet and d-you | [`eudi-wallet.index.html`](eudi-wallet.index.html) |
| The Fediverse | [`fediverse.index.html`](fediverse.index.html) |
| Linux is not an operating system (12 April 2026) | [`linux.index.html`](linux.index.html) |
| Sample deck with every layout | [`lipsum.index.html`](lipsum.index.html) |

The slides are in German.

## Presenting

Download or clone the repo and double-click a `*.index.html`. No install, no internet
connection needed — it runs in any current browser.

| Key | Action |
| --- | --- |
| <kbd>→</kbd> <kbd>Space</kbd> <kbd>PgDn</kbd> | next |
| <kbd>←</kbd> <kbd>PgUp</kbd> | back |
| <kbd>Home</kbd> / <kbd>End</kbd> | first / last slide |
| <kbd>F</kbd> | fullscreen |
| <kbd>N</kbd> | toggle speaker notes |
| <kbd>S</kbd> | presenter view (second window: current + next slide, notes, timer) |
| <kbd>P</kbd> | reset timer |
| number + <kbd>Enter</kbd> | jump to slide, e.g. <kbd>1</kbd> <kbd>5</kbd> <kbd>Enter</kbd> → slide 15 (<kbd>Esc</kbd> cancels) |
| <kbd>Shift</kbd>+<kbd>E</kbd> / <kbd>G</kbd> / <kbd>D</kbd> / <kbd>K</kbd> | color theme: EU / Grüne / DI.DAY / Eurosky (default per talk: `theme` in `deck.toml`) |

Jump to a slide with its number in the URL, e.g. `eudi-wallet.index.html#5`.

PDF: print the deck (<kbd>Ctrl</kbd>+<kbd>P</kbd>) and save as PDF. Every slide becomes one 16:9 page with
all steps revealed and without speaker notes; if colored backgrounds are missing, enable "Background graphics".

## Editing slides

Each talk has one Markdown file per slide in `data/<talk>/slides/`. Their order, the title slide
and the timer target come from `data/<talk>/deck.toml`; to move a slide, move its line there.
Rebuild afterwards (requires Node.js):

```sh
node src/build.js              # all talks
node src/build.js fediverse    # a single talk
```

New talk: create `data/<talk>/deck.toml` (and `slides/`) and build. The `deck.toml` keys, slide
layouts and header keys are documented at the top of [`src/build.js`](src/build.js).

```text
src/                     shared code and design (build.js, deck.js, style.css, font, vendor/)
data/<talk>/deck.toml    title, subtitle, event, duration, slide order
data/<talk>/slides/      one .md per slide (files not listed in deck.toml are skipped)
data/<talk>/             research notes, img/
<talk>.index.html        generated – do not edit by hand
index.html               generated overview of all listed talks (hide one with listed = false)
```

## Development

Git hooks run via [prek](https://prek.j178.dev) (`prek.toml`): `prek install`, then
`prek run --all-files`. Links in Markdown files are checked weekly by [lychee](https://lychee.cli.rs)
(`lychee.toml`, command for a local run at its top).

See [CONTRIBUTING.md](CONTRIBUTING.md) and the [Code of Conduct](CODE_OF_CONDUCT.md).
Notes for AI agents are in [AGENTS.md](AGENTS.md).

## License

[REUSE](https://reuse.software)-compliant, see [LICENSE](LICENSE) and [REUSE.toml](REUSE.toml):

- Talk content (`data/`, `*.index.html`): [CC BY 4.0](LICENSES/CC-BY-4.0.txt), © 2026 krahlos
- Code, configuration and docs: [EUPL-1.2](LICENSES/EUPL-1.2.txt), © 2026 krahlos
- marked (Markdown parser): MIT AND BSD-3-Clause
- smol-toml (TOML parser): BSD-3-Clause
- QR Code Generator (build-time QR codes): MIT, © 2009 Kazuhiko Arase
- Mermaid (diagrams, rendered in the browser): MIT, © 2014-2022 Knut Sveidqvist
- highlight.js (syntax highlighting at build time): BSD-3-Clause, © 2006 Ivan Sagalaev
- Font Atkinson Hyperlegible: OFL-1.1, © 2020 Braille Institute of America, Inc.

## Disclaimer

Research and slides are prepared with agentic assistance. Every claim carries its source on the
slide — check them before you reuse a deck, and open an issue if something is wrong.

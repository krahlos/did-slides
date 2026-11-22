# DI.DAY talks on European digital topics

**Start a presentation:** double-click the matching `*.index.html`. Works offline in any current browser.
The slides are in German.

| File | Talk |
| --- | --- |
| `eudi-wallet.index.html` | The EUDI Wallet and d-you |
| `digitaler-euro.index.html` | The digital euro |
| `fediverse.index.html` | The Fediverse |
| `lipsum.index.html` | Sample deck showing every slide layout |

| Key | Action |
| --- | --- |
| → Space PgDn | next |
| ← PgUp | back |
| Home / End | first / last slide |
| F | fullscreen |
| N | toggle speaker notes |
| S | presenter view (second window: current + next slide, notes, timer) |
| P | reset timer |

Jump to slide 5: `eudi-wallet.index.html#5`.

## Layout

```text
src/                shared code and design (build.js, deck.js, style.css, font, marked)
data/<talk>/        slides.md, research notes, img/
<talk>.index.html   generated – do not edit by hand
```

## Editing slides

Slides live in `data/<talk>/slides.md`. Rebuild afterwards (requires Node.js):

```sh
node src/build.js              # all talks
node src/build.js fediverse    # a single talk
```

New talk: create `data/<talk>/` with a `slides.md` and build. Slide layouts and header keys are
documented at the top of `src/build.js`.

## Development

Git hooks run via [prek](https://prek.j178.dev) (`prek.toml`): `prek install`, then
`prek run --all-files`. Commit messages follow [Conventional Commits](https://www.conventionalcommits.org).
Links in Markdown files are checked weekly by [lychee](https://lychee.cli.rs) (`lychee.toml`,
command for a local run at its top).
Notes for AI agents are in [AGENTS.md](AGENTS.md).

## License

[REUSE](https://reuse.software)-compliant, see [LICENSE](LICENSE) and [REUSE.toml](REUSE.toml):

- Talk content (`data/`, `*.index.html`): [CC BY 4.0](LICENSES/CC-BY-4.0.txt), © 2026 krahlos
- Code, configuration and docs: [EUPL-1.2](LICENSES/EUPL-1.2.txt), © 2026 krahlos
- marked (Markdown parser): MIT AND BSD-3-Clause
- Font Atkinson Hyperlegible: OFL-1.1, © 2020 Braille Institute of America, Inc.

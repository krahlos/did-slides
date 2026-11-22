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
Notes for AI agents are in [AGENTS.md](AGENTS.md).

## Licenses

- Font Atkinson Hyperlegible: SIL Open Font License, `src/fonts/OFL-LICENSE.txt`
- marked (Markdown parser): MIT, `src/vendor/marked-LICENSE.md`

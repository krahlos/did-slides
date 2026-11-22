# Contributing

Contributions are welcome — no approval needed to get started.

## What helps most

- **Corrections**: A wrong date, number or quote on a slide is the worst bug this repo can have.
  Open an issue or PR with the correct value and its source.
- **Sources**: Better or more primary sources for an existing claim, or a replacement for a dead link.
- **New talks**: Create an issue describing the topic, then start a draft PR with a new
  `data/<talk>/slides.md`. `lipsum.index.html` shows every slide layout.

## Guidelines

- Keep PRs focused — one talk or one fix per PR
- Every claim on a slide needs a source (`source:` in the slide header); prefer primary sources
- Keep the tone sober and neutral: no advertising, no party politics, criticism and response
  get equal weight
- Slides and speaker notes are in German, everything else (docs, comments, commits) in English
- Edit `data/<talk>/slides.md`, never the generated `*.index.html`; rebuild with `node src/build.js`
- Third-party images only with cleared rights, plus an entry in [`REUSE.toml`](REUSE.toml)
- Use [Conventional Commits][cc] and [`prek`][prek], since the hooks are anyway enforced on CI
- PRs are squash-merged with the PR title as commit message, so the title must be a
  Conventional Commit too (e.g. `fix: correct date of the eIDAS vote`); CI checks it

## License

By contributing you agree that your contribution is licensed like the rest of the repo:
talk content under CC BY 4.0, code under EUPL-1.2 (see [LICENSE](LICENSE)).

[cc]: https://www.conventionalcommits.org
[prek]: https://github.com/j178/prek

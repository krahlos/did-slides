# DI.DAY-Vorträge zu europäischen Digitalthemen

**Präsentation starten:** die passende `*.index.html` doppelklicken. Läuft offline in jedem aktuellen Browser.

| Datei | Vortrag |
| --- | --- |
| `eudi-wallet.index.html` | Die EUDI-Wallet und d-you |
| `digitaler-euro.index.html` | Der digitale Euro |
| `fediverse.index.html` | Das Fediverse |
| `lipsum.index.html` | Musterdeck mit allen Folientypen (Vorlage zum Abschauen) |

| Taste | Funktion |
| --- | --- |
| → Leertaste Bild↓ | vor |
| ← Bild↑ | zurück |
| Pos1 / Ende | erste / letzte Folie |
| F | Vollbild |
| N | Sprechernotizen ein/aus |
| S | Referentenansicht (zweites Fenster: aktuelle + nächste Folie, Notizen, Timer) |
| P | Timer zurücksetzen |

Direkt zu Folie 5: `eudi-wallet.index.html#5`.

## Aufbau

```
src/              gemeinsames Design und Code (build.js, deck.js, style.css, Schrift, marked)
data/<thema>/     slides.md, Recherche-Notizen, img/
<thema>.index.html  erzeugt – nicht von Hand bearbeiten
```

## Folien bearbeiten

Folien stehen in `data/<thema>/slides.md`. Danach neu bauen (Node.js nötig):

```sh
node src/build.js              # alle Themen
node src/build.js fediverse    # nur eins
```

Neues Thema: Ordner `data/<thema>/` mit einer `slides.md` anlegen und bauen. Folientypen und Kopf-Einträge sind oben in `src/build.js` beschrieben.

## Lizenzen

- Schrift Atkinson Hyperlegible: SIL Open Font License, `src/fonts/OFL-LICENSE.txt`
- marked (Markdown-Parser): MIT, `src/vendor/marked-LICENSE.md`

---
layout: title
duration: 10
---
# Lorem ipsum dolor

## Musterdeck mit allen Folientypen

DI.DAY · Datum · Ort

Note:
Musterfolie **title**. `duration: 10` setzt die Sollzeit des Timers in der Referentenansicht (Taste S). Notizen erscheinen mit Taste N.

---
layout: section
chapter: Lorem ipsum
---
## Lorem ipsum dolor sit amet

Consectetur adipiscing elit, sed do eiusmod tempor.

Note:
Musterfolie **section**. `chapter` liefert den Kurznamen für die Fußzeile, die Nummer zählt automatisch.

---
layout: default
source: Lorem 2024/1183
---
## Folientyp default

- Lorem ipsum dolor sit amet
- Consectetur adipiscing elit, sed do eiusmod
- Tempor incididunt ut labore et dolore
  - Unterpunkt magna aliqua
- Ut enim ad minim veniam

Note:
Musterfolie **default**.

---
layout: default
steps: true
source: Lorem ipsum
---
## Folientyp default mit steps

1. Erster Punkt erscheint nach Tastendruck
2. Zweiter Punkt
3. Dritter Punkt

Note:
`steps: true` deckt die Punkte einzeln auf.

---
layout: statement
source: Lorem ipsum
---
## 5½ Jahre

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.

Note:
Musterfolie **statement**: eine große Zahl oder Aussage.

---
layout: timeline
source: Lorem ipsum
---
## Folientyp timeline

- **2021** Lorem ipsum dolor sit amet
- **2022** Consectetur adipiscing
- **2023** Sed do eiusmod tempor
- **2024** Incididunt ut labore
- **2026** Dolore magna aliqua
- **2027** Ut enim ad minim

Note:
Musterfolie **timeline**: Liste mit `- **Datum** Text`.

---
layout: section
---
## Dolor sit amet

Note:
Zweite **section**-Folie ohne `chapter`: Die Fußzeile nimmt dann die Überschrift.

---
layout: procon
steps: true
source: Lorem ipsum
---
## Folientyp procon

### Kritik

- Lorem ipsum dolor sit amet
- Consectetur adipiscing elit

### Regierung / Projekt

- Sed do eiusmod tempor
- Incididunt ut labore et dolore

Note:
Beide Spalten gleich gewichtet. Mit `steps: true` erscheinen die Spalten nacheinander. Spalten beginnen mit `###`.

---
layout: table
source: Lorem ipsum
---
## Folientyp table

| Spalte A | Spalte B | Spalte C |
| --- | --- | --- |
| Lorem ipsum | Dolor sit | Amet |
| Consectetur | Adipiscing | Elit |
| Sed do | Eiusmod | Tempor |

---
layout: image
source: Lorem ipsum
---
## Folientyp image

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

- Bild über `image:` im Kopf, relativ zu `data/<thema>/`
- Bildnachweis über `credit:`

Note:
Ohne `image:` erscheint der Platzhalter „Bild folgt“.

---
layout: sources
---
## Quellen

- [Lorem ipsum dolor](https://example.org)
- [Consectetur adipiscing](https://example.org)
- [Sed do eiusmod](https://example.org)
- Tempor incididunt ut labore
- Dolore magna aliqua
- Ut enim ad minim veniam

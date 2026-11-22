---
layout: diagram
---
## GNU? Linux? Hä?

```mermaid
---
config:
  flowchart:
    rankSpacing: 20
---
flowchart TB
  apps["<b>Anwendungsprogramme</b><br>Browser · Office · Mediaplayer · Spiele"]
  subgraph os [Betriebssystem]
    direction TB
    g["Grafische Oberfläche (Desktop)"]
    d["Systemdienste & Konfiguration"]
    l["Systembibliotheken (z. B. GNU)"]
    k["<b>Linux (Kernel)</b><br>Prozesse · Speicher · Treiber"]
    g ~~~ d ~~~ l ~~~ k
  end
  hw["<b>Hardware</b><br>CPU · RAM · Festplatte · GPU"]
  apps <-- "Anfragen & Ausgaben" --> os
  os -- "direkte Befehle" --> hw
```

- **Linux** allein ist nur der Kernel: steuert die Hardware, verteilt Ressourcen
- **GNU** liefert Werkzeuge wie Shell, Compiler und Bibliotheken
- **Oberflächen** kommen z. B. von GNOME oder KDE
- Zusammen ergibt das ein Betriebssystem
- Die FSF nennt es deshalb **GNU/Linux**; üblich ist kurz „Linux“

Note:
Im alten Foliensatz stand „Korrekt daher eigentlich: GNU/Linux“. Das ist die Position der FSF und umstritten. Neutral: beide Namen nennen.

Diagramm gegenüber dem Original umgedreht: Hardware unten, Anwendungen oben. Die Befehle gehen vom Betriebssystem an die Hardware.

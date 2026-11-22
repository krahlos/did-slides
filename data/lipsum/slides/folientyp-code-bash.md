---
layout: code
source: Lorem ipsum
---
## Folientyp code: Bash

```bash
#!/usr/bin/env bash
# Sicherung aller Folien, ein Archiv pro Tag
set -euo pipefail

ziel="$HOME/sicherung/$(date +%F)"
mkdir -p "$ziel"
for datei in data/*/slides/*.md; do
  cp "$datei" "$ziel/"
done
echo "Gesichert: $(ls "$ziel" | wc -l) Dateien"
```

Note:
Musterfolie **code** ohne Text daneben: der Code nutzt die ganze Breite.

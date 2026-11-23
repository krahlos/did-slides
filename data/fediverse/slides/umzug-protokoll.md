---
layout: default
steps: true
source: atproto.com/guides/account-migration
---
## Wie ein Umzug funktioniert

1. Neues Konto mit derselben DID auf dem neuen PDS anlegen
2. Alle Daten exportieren und importieren, dazu Medien und Einstellungen
3. DID-Dokument auf den neuen PDS umstellen
4. Follower merken nichts: sie folgen der DID, nicht dem Server

Note:
Ablauf laut atproto.com: Token vom alten PDS holen, Konto mit gleicher DID auf dem neuen PDS anlegen (zunächst deaktiviert), Repository als CAR-Datei exportieren und importieren, Blobs (Medien) und Einstellungen kopieren, DID-Dokument aktualisieren. Bis zum letzten Schritt kann man laut Doku „ohne Folgen“ abbrechen.

Fällt der alte PDS aus, ist mit eigenen Rotationsschlüsseln eine „adversarial migration“ möglich.

Genau dieses Verfahren nutzt später EU-HAUL.

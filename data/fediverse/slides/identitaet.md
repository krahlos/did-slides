---
layout: default
source: atproto.com/specs/did, /specs/handle, /guides/overview
---
## Identität gehört nicht dem Server

- **DID**: dauerhafte Kennung des Kontos, ändert sich beim Umzug nicht
- **Handle**: ein Domainname, z. B. *name.bsky.social* oder die eigene Domain
- **Schlüssel**: mit eigenen Rotationsschlüsseln geht der Umzug auch ohne den alten Server

Note:
DID = Decentralized Identifier. ATProto unterstützt zwei Methoden: did:plc (für ATProto entwickelt, über das PLC-Verzeichnis) und did:web (über DNS/HTTPS, ohne Umzugsmechanismus).

Handle: wird per DNS-TXT-Eintrag „_atproto“ oder per HTTPS (/.well-known/) bestätigt und gilt nur, wenn DID und Handle aufeinander verweisen.

Schlüssel: Der Signaturschlüssel liegt beim PDS. Rotationsschlüssel dürfen das DID-Dokument ändern – sie können beim Nutzer liegen, z. B. als Papierschlüssel.

Das PLC-Verzeichnis zählt laut eigener Seite über 40 Mio. registrierte Kennungen; 2026 wurde dafür eine eigene PLC Organization als neutrale Verwalterin gegründet.

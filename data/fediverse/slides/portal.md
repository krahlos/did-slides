---
layout: default
source: eurosky.tech/products; eurosky.tech/blog/eurosky-portal-beta; github.com/eurosky-social/eurosky-portal
---
## Portal: das Konto im Blick

- **Übersicht**: Beiträge, Follows und letzte Aktivität über alle Apps
- **Verwalten**: Name, Passwort, verbundene Apps, Konto löschen
- **Entdecken**: Verzeichnis mit Apps, die das Konto nutzen können
- **Beta** seit 15. April 2026, Open Source (MIT), für Eurosky-Konten

Note:
Adresse: portal.eurosky.tech (portal.eurosky.social leitet dorthin weiter). Eurosky (Produktseite): „The Portal is the front end for your Atmosphere account. It is where you access settings to change your username and password, check which applications you have authorized, and discover apps you can use with your account. You can also deactivate or delete your account there.“

Startseite des Portals: „One account. Dozens of apps. No lock-in.“ Seit Version 1.9.0 (02.11.2026) gibt es eine Dateiansicht: Man sieht, welche Daten Apps im eigenen Konto abgelegt haben.

Nur für Eurosky-Konten: Laut README prüft das Portal, dass das Konto auf dem Eurosky-PDS liegt (Einstellung ALLOW_EXTERNAL_LOGINS standardmäßig aus). Bluesky-Nutzer ziehen also erst mit EU-HAUL um.

PRÜFEN: Im Quellcode des Portals (Stand 12.11.2026) fanden sich keine eigenen Seiten für Namens- oder Passwortänderung und Löschen – vermutlich laufen sie über den PDS. Vor dem Vortrag im Portal nachsehen.

---
url: https://eudi-wallet.gov.de
date: 2026-12-06
author: Claude Opus 5.5
---
## Ablauf (ca. 26 Minuten)

Der Vortrag führt in fünf Teilen von der EU-Verordnung zur deutschen App und endet mit der Berichterstattung. Teil 1 bis 4 stützen sich ausschließlich auf Primärquellen (EU-Rechtstexte, EU-Kommission, Bundestag, Bundesregierung, BMDS, SPRIND, Projektdokumentation); erst Teil 5 zieht Medien heran.

| Teil | Inhalt | Minuten |
| --- | --- | --- |
| Einstieg | Frage ans Publikum: Wer hat die Online-Ausweisfunktion schon genutzt? | 1 |
| 1 | Die europäische Idee: eIDAS 2.0 und ihre Grundprinzipien | 4–5 |
| 2 | Zeitleiste und Meilensteine (EU und Deutschland) | 5–6 |
| 3 | d-you: Funktionen, Einrichtung, Technik, Rechtsrahmen | 6–7 |
| 4 | SPRIND und Common Codes: wer setzt um? | 3 |
| 5 | Berichterstattung: Kritik und Gegenpositionen | 5–7 |
| Schluss | Was am 2. Januar 2027 zu beobachten ist; Fragen | 1–2 |

Zum Kürzen auf 20 Minuten: in Teil 2 nur die vier Kerndaten nennen (Vorschlag 2021, Verordnung 2024, Durchführungsrechtsakte 2024, Start 2027) und in Teil 3 die Gerätetabelle weglassen.

Stand aller Angaben: 03.11.2026. Der Start liegt in der Zukunft; Funktionsumfang und Termin sollten kurz vor dem Vortrag erneut geprüft werden.

## Teil 1: Die europäische Idee (ca. 5 Min.)

Kernaussage: Jeder EU-Mitgliedstaat muss seinen Bürgerinnen und Bürgern mindestens eine digitale Brieftasche anbieten, die EU-weit anerkannt wird – freiwillig, kostenlos und unter Kontrolle der Nutzenden. Rechtsgrundlage ist die [Verordnung (EU) 2024/1183](https://eur-lex.europa.eu/eli/reg/2024/1183/oj), oft „eIDAS 2.0“ genannt.

**Ausgangslage: eIDAS 1.0**

- Die Verordnung (EU) Nr. 910/2014 von 2014 regelte die gegenseitige Anerkennung nationaler elektronischer Ausweise (in Deutschland: Online-Ausweisfunktion des Personalausweises) und Vertrauensdienste wie Signaturen.
- Die neue Verordnung begründet die Reform mit der Zersplitterung nationaler Lösungen und damit, dass einige Staaten gar keine eID hatten (Erwägungsgrund 7).
- Politische Anstöße laut Verordnung: Kommissionsmitteilung „Shaping Europe’s Digital Future“ (19.02.2020), Europäischer Rat vom 1./2.10.2020, Digitalziele 2030 (Erwägungsgründe 1–3).

**Was die Verordnung vorschreibt (Art. 5a ff.)**

| Prinzip | Regelung | Fundstelle |
| --- | --- | --- |
| Pflicht der Staaten | Mindestens eine Wallet je Mitgliedstaat, binnen 24 Monaten nach Inkrafttreten der Durchführungsrechtsakte | Art. 5a Abs. 1 |
| Anbieter | Direkt vom Staat, im staatlichen Auftrag oder unabhängig, aber staatlich anerkannt | Art. 5a Abs. 2 |
| Open Source | Quellcode der App-Komponenten unter Open-Source-Lizenz; Ausnahmen nur für Komponenten außerhalb des Geräts | Art. 5a Abs. 3 |
| Freiwilligkeit | Wer keine Wallet nutzt, darf bei Diensten, Arbeitsmarkt und Geschäftstätigkeit nicht benachteiligt werden | Art. 5a Abs. 15 |
| Kostenlos | Ausgabe, Nutzung und Widerruf für natürliche Personen gratis; ebenso qualifizierte E-Signatur (nicht-beruflich) | Art. 5a Abs. 13, Abs. 5 lit. g |
| Datensparsamkeit | Selektive Offenlegung; Pseudonyme; kein Tracking durch Aussteller oder Dritte | Art. 5a Abs. 4, 16 |
| Transparenz | Dashboard mit Protokoll aller Transaktionen; Löschanfrage und Meldung an Datenschutzbehörde direkt aus der App | Art. 5a Abs. 4 lit. d |
| Registrierung | Dienste, die Daten abfragen wollen, müssen sich registrieren und angeben, welche Daten sie wozu verlangen | Art. 5b |
| Akzeptanzpflicht | Behörden mit Online-Identifizierung; private Anbieter mit starker Authentifizierung (z. B. Banken, Energie, Telekom) spätestens 36 Monate nach Inkrafttreten der Durchführungsrechtsakte; sehr große Online-Plattformen | Art. 5f |

**Was in der Wallet liegen soll**

- Personenidentifizierungsdaten (PID), abgeleitet aus dem staatlichen Ausweis.
- Elektronische Attributsbescheinigungen (EAA), z. B. Führerschein, Diplome, Berechtigungen (Erwägungsgründe 7, 54, 55).
- Funktion zum qualifizierten elektronischen Signieren.

Hinweis für den Vortrag: Die Verordnung nennt Zero-Knowledge-Proofs als zu integrierende Technik (Erwägungsgrund 14), schreibt aber keine bestimmte Technologie vor. Das ist ein Punkt, den später auch die Kritik aufgreift.

## Teil 2: Das Projekt – Zeitleiste und Meilensteine (ca. 6 Min.)

Kernaussage: Von der Kommissionsvorlage (Juni 2021) bis zum geplanten Start in Deutschland (2. Januar 2027) vergehen gut fünfeinhalb Jahre; Recht, Technik und nationale Umsetzung liefen dabei parallel. Für den Vortrag in chronologischer Reihenfolge.

**EU-Ebene**

| Datum | Meilenstein | Quelle |
| --- | --- | --- |
| 03.06.2021 | Kommission legt Verordnungsvorschlag COM(2021) 281 vor; parallel Empfehlung (EU) 2021/946 zur gemeinsamen „Toolbox“ | [EP Legislative Train](https://www.europarl.europa.eu/legislative-train/spotlight-JD22/file-eid), [ARF-Repository](https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework) |
| 22.02.2022 | eIDAS-Expertengruppe veröffentlicht Gliederung des Architecture and Reference Framework (ARF) | [ARF Outline](https://interoperable-europe.ec.europa.eu/sites/default/files/discussion/attachment/2022-02/Outline%20final.pdf) |
| 06.12.2022 | Allgemeine Ausrichtung des Rates | EP Legislative Train |
| 26.01.2023 | ARF Version 1.0 verabschiedet | [ARF](https://eu-digital-identity-wallet.github.io/eudi-doc-architecture-and-reference-framework/arf) |
| 16.03.2023 | Verhandlungsmandat des Parlaments (418 : 103 : 24) | EP Legislative Train |
| 01.04.2023 | Start von vier Großpiloten (POTENTIAL, EWC, NOBID, DC4EU), über 350 Organisationen aus 26 Staaten plus Norwegen, Island, Ukraine | [EU-Kommission](https://digital-strategy.ec.europa.eu/en/policies/eudi-wallet-implementation) |
| 29.06.2023 | Vorläufige Einigung im Trilog über Kernelemente | [EU-Kommission](https://digital-strategy.ec.europa.eu/en/news/commission-welcomes-final-agreement-eu-digital-identity-wallet) |
| 08.11.2023 | Trilog abgeschlossen | EP Legislative Train |
| 29.02.2024 | Parlament stimmt zu (335 : 190 : 31) | EP Legislative Train |
| 26.03.2024 | Rat stimmt zu | EP Legislative Train |
| 11.04. / 30.04. / 20.05.2024 | Unterzeichnung / Amtsblatt / Inkrafttreten der Verordnung (EU) 2024/1183 | [EUR-Lex](https://eur-lex.europa.eu/eli/reg/2024/1183/oj) |
| 28.11.2024 | Erste Durchführungsverordnungen (u. a. 2024/2977, 2979, 2982) beschlossen; Amtsblatt 04.12.2024, in Kraft 20 Tage später | [EU-Kommission](https://digital-strategy.ec.europa.eu/en/news/commission-adopts-technical-standards-cross-border-european-digital-identity-wallets), [EUR-Lex](https://eur-lex.europa.eu/eli/reg_impl/2024/2979/oj) |
| 06./07.05.2025 | Zweite Runde, u. a. Registrierung von Vertrauensparteien (2025/848) | [EUR-Lex](https://eur-lex.europa.eu/eli/reg_impl/2025/848/oj) |
| Ende Dez. 2026 | Frist für die Mitgliedstaaten: 24 Monate nach Inkrafttreten der ersten Durchführungsrechtsakte (Art. 5a Abs. 1) | Verordnung + Amtsblattdaten |

**Deutschland**

| Datum | Meilenstein | Quelle |
| --- | --- | --- |
| 31.07.2023 | Kick-off des offenen Architektur- und Konsultationsprozesses des BMI; Dokumente auf openCoDE | [Drucksache 21/7319](https://dserver.bundestag.de/btd/21/073/2107319.pdf), [eudi-wallet.gov.de](https://eudi-wallet.gov.de/ueber) |
| Feb./März 2024 | Erster und zweiter Architekturvorschlag in öffentlichen Online-Konsultationen | Drucksache 21/7319 |
| 11.04.2024 | SPRIND startet im Auftrag des BMI den Innovationswettbewerb „Funke EUDI Wallet Prototypes“ | [SPRIND-Pressemitteilung](https://cms.system.sprind.org/uploads/2400411_Pressemitteilung_SPRIND_Funke_EUDI_Wallet_Prototyp_lang_79bd279dcd.pdf) |
| 29.05.2024 | Sechs geförderte Teams für Stufe 1 ausgewählt | [SPRIND](https://cms.system.sprind.org/uploads/240529_Pressemitteilung_SPRIND_Funke_EUDI_Wallet_Prototyp_Teams_386afc3975.pdf) |
| Sommer 2024 | Beginn der Entwicklung der staatlichen Wallet | Drucksache 21/7319 |
| Sept. 2024 | Bundesregierung beschließt: eigene staatliche Wallet plus Zulassung von Drittanbieter-Wallets | [Architekturdoku](https://bmi.usercontent.opencode.de/eudi-wallet/wallet-development-documentation-public/latest/) |
| Okt. 2024 | BMI entscheidet sich nach Optionsanalyse (SPRIND, BSI, BMI, BfDI) für die Architektur „signierte Daten“ | Drucksache 21/7319 |
| 06.05.2025 | Neues Bundesministerium für Digitales und Staatsmodernisierung (BMDS); es übernimmt die Federführung | Organisationserlass; eudi-wallet.gov.de |
| 14.10.2025 | Abschlusskonferenz des Funke-Wettbewerbs (15 Monate, 3 Stufen) | [SPRIND](https://www.sprind.org/en/actions/challenges/eudi-wallet-prototypes) |
| Nov. 2025 | Absichtserklärung (MoU) von BMDS und Bitkom mit Unternehmen | [Bitkom](https://www.bitkom.org/MoU-EUDI-Wallet) |
| Dez. 2025 / Apr. 2026 | Sandbox: Tests mit Identitätsdaten (PID) ab Dezember 2025, mit Nachweisen (EAA) ab April 2026 | Drucksache 21/7319 |
| Mai 2026 | Gründung der Common Codes GmbH als Orchestrator im Auftrag des BMDS | Drucksache 21/7319 |
| Juni / Juli 2026 | Erste Penetrationstests; Umzug in die Produktionsumgebung des Betriebspartners | Drucksache 21/7319 |
| 09.09.2026 | Minister Wildberger stellt den Namen „d-you“ vor; rund 40 Launch-Partner | [eudi-wallet.gov.de](https://eudi-wallet.gov.de/news/d-you-name-logo-eudi-wallet) |
| Mitte Sept. 2026 | Öffentliches Bug-Bounty-Programm (HackerOne) | [eudi-wallet.gov.de](https://eudi-wallet.gov.de/news/d-you-wallet-bug-bounty-programm) |
| 23.09. – 15.10.2026 | Digitale Identitätengesetz (DIdG): 1. Lesung, Anhörung (06.10.), Beschluss im Bundestag (15.10.) | [Bundestag](https://www.bundestag.de/dokumente/textarchiv/2026/kw42-de-digitale-identitaeten-gesetz-1223586) |
| 02.01.2027 | Geplanter Start von d-you; laut Bundesregierung entscheidet sie „unter Berücksichtigung eventueller Restrisiken“ über den Start | eudi-wallet.gov.de, Drucksache 21/7319 |

Hinweis für den Vortrag: Die EU-Frist endet rechnerisch Ende Dezember 2026, der deutsche Start ist für den 2. Januar 2027 geplant. Die Bundesregierung bezeichnet den Start als fristgerecht; diese Bewertung sollte man als Aussage der Regierung kennzeichnen.

## Teil 3: d-you – die deutsche Umsetzung (ca. 6–7 Min.)

Kernaussage: d-you ist die staatliche deutsche EUDI-Wallet, geplant ab 2. Januar 2027 für Android und iOS. Sie startet mit einem Teil der von der EU geforderten Funktionen und soll schrittweise wachsen.

**Eckdaten**

- Name und Logo am 09.09.2026 von Digitalminister Karsten Wildberger vorgestellt; „d“ steht laut BMDS u. a. für digital und Deutschland, „you“ für Nutzerorientierung ([Meldung](https://eudi-wallet.gov.de/news/d-you-name-logo-eudi-wallet)).
- Nutzung freiwillig und kostenlos; bestehende Ausweismittel werden nicht ersetzt ([Bundestag](https://www.bundestag.de/dokumente/textarchiv/2026/kw42-de-digitale-identitaeten-gesetz-1223586)).
- Wallet-Anbieter und zentraler Orchestrator des Ökosystems ist die Common Codes GmbH ([Bug-Bounty-Meldung](https://eudi-wallet.gov.de/news/d-you-wallet-bug-bounty-programm)).
- Die Bundesregierung lässt neben d-you perspektivisch auch private Wallets zu, wenn sie die Sicherheitsvorgaben erfüllen ([Projektseite](https://eudi-wallet.gov.de/ueber)).

**Was zum Start geplant ist – und was später kommt**

| Funktion | Stand laut Primärquellen |
| --- | --- |
| Digitaler Ausweis (PID) aus Personalausweis oder elektronischem Aufenthaltstitel | Zum Start |
| Elektronische Nachweise (EAA), z. B. digitaler Führerschein | Laut Bundesregierung (Juli 2026) zum Start nutzbar; welche Nachweise es tatsächlich gibt, hängt von den Ausstellern ab. Der zentrale Ausstellungsdienst für Verwaltungsnachweise soll im 1. Quartal 2027 produktiv gehen |
| EUDI Hub (Portal für registrierte Dienste und Aussteller) | Zum Start |
| QES, Pseudonyme, Zahlungsfreigabe, Wallet-zu-Wallet | Später; laut Bundesregierung fehlen dafür noch EU-Spezifikationen. Bundestag fordert Pseudonyme schnellstmöglich nachzuliefern |
| Zero-Knowledge-Proofs | Nicht zum Start; Verfahren auf EU-Ebene noch nicht festgelegt |
| Lichtbild in den Identitätsdaten | Nach der ersten Stufe; die EU-Kommission hat ein verpflichtendes Foto vorgeschlagen, das DIdG erlaubt die Ablehnung |

Quelle: [Antwort der Bundesregierung, Drucksache 21/7319 vom 21.07.2026](https://dserver.bundestag.de/btd/21/073/2107319.pdf).

Ein Vertreter der Bundesdatenschutzbeauftragten (BfDI) hat in der Bundestagsanhörung darauf hingewiesen, dass die erste Version noch nicht alle Funktionen der eIDAS-Verordnung erfüllen werde ([Anhörung 06.10.2026](https://www.bundestag.de/dokumente/textarchiv/2026/kw41-pa-digitales-1218122)).

**So funktioniert die Einrichtung**

1. App installieren; das Gerät muss eine Bildschirmsperre haben.
2. Personalausweis (Deutsche) oder elektronischen Aufenthaltstitel (Nicht-EU-Bürger) per NFC ans Handy halten und die eID-PIN eingeben; technisch über das AusweisApp-SDK.
3. Eine eigene Wallet-PIN festlegen; sie schützt Schlüssel, die in einem gesicherten Server-Modul des Anbieters liegen („Remote WSCA“).
4. Der PID-Provider stellt die Identitätsdaten in zwei Formaten aus (SD-JWT VC und ISO mdoc).

Quelle: [Architekturdokumentation, PID-Ausstellung](https://bmi.usercontent.opencode.de/eudi-wallet/wallet-development-documentation-public/latest/architecture-concept/03-data-flows/21-pid-issuance.html).

**Technische Mindestanforderungen (Stand Juli 2026)**

| Anforderung | Android | iOS |
| --- | --- | --- |
| Betriebssystem | Android 14, 15, 16 oder 17 | iOS 18 oder 26 |
| Hardware-Schlüsselspeicher | TEE oder StrongBox | Secure Enclave |
| Weitere | NFC, Internetverbindung, Bildschirmsperre | Internetverbindung, Bildschirmsperre |

Quelle: [Architekturdokumentation, Mobile Devices](https://bmi.usercontent.opencode.de/eudi-wallet/wallet-development-documentation-public/latest/architecture-concept/02-architecture/05-mobile-devices.html). Die Mindest-Patchstände sind dort noch offen. Achtung, Abweichung: Die Bundesregierung nennt in Drucksache 21/7319 „Android ab Version 13“ und schätzt, dass mehr als 80 Prozent der Geräte erreicht werden. Laut derselben Antwort ist kein Google- oder Apple-Konto nötig, und Googles Play Integrity API wird nicht eingesetzt.

**Datenschutz- und Sicherheitsmerkmale laut Projekt**

- Nachweise liegen verschlüsselt auf dem Gerät, keine zentrale Datensammlung ([App-Seite](https://eudi-wallet.gov.de/app)).
- Die Wallet prüft vor jeder Freigabe, ob die Anfrage zum registrierten Zweck des Dienstes passt; sonst wird sie abgelehnt ([Meldung](https://eudi-wallet.gov.de/news/digitale-nachweise-einfach-sicher-datensparsam)).
- Einmal-Nachweise sollen verhindern, dass zwei Anfragen miteinander verknüpft werden können („Unlinkability“).
- Dashboard mit allen Anfragen; Sperre bei Geräteverlust.
- Architektur dokumentiert auf openCoDE; Quellcode der Apps und des Backends auf GitHub (Organisation „german-national-wallet“, Lizenz EUPL-1.2 bzw. Apache-2.0); seit Mitte September 2026 öffentliches Bug-Bounty über HackerOne, Prämien bis 40.000 US-Dollar.

**Rechtsrahmen in Deutschland**

Der Bundestag hat das Digitale Identitätengesetz (DIdG) am 15.10.2026 mit den Stimmen von CDU/CSU und SPD beschlossen. Es regelt u. a. die Bundesnetzagentur als Aufsicht, die Ablehnung des biometrischen Fotos in den Identitätsdaten und die Online-Ausweisfunktion ab 13 Jahren ([Bundestag](https://www.bundestag.de/dokumente/textarchiv/2026/kw42-de-digitale-identitaeten-gesetz-1223586)). Offene Frage für den Vortrag: Stand im Bundesrat vor dem Termin prüfen.

**Kosten laut Bundesregierung:** 79,3 Mio. € für 2023–2026 und 135,0 Mio. € für 2027–2028 (jeweils netto), ohne Kosten für Aussteller und Akzeptanzstellen (Drucksache 21/7319).

## Teil 4: SPRIND – wer setzt um? (ca. 3 Min.)

Kernaussage: Entwickelt wird d-you nicht von einer Behörde, sondern von SPRIND, einer bundeseigenen Innovationsagentur – im Auftrag des Digitalministeriums. 2026 wurde dafür die Common Codes GmbH gegründet, die inzwischen als Wallet-Anbieter auftritt.

**Was SPRIND ist**

- Bundesagentur für Sprunginnovationen, gegründet 2019, Sitz Leipzig, Rechtsform GmbH ([SPRIND](https://www.sprind.org/en/we)).
- Eigentlicher Auftrag: Förderung von „Sprunginnovationen“, also radikal neuen Technologien, u. a. über Wettbewerbe („Challenges“, „Funken“), Finanzierungen und Beteiligungen.
- Seit dem SPRIND-Freiheitsgesetz vom 22.12.2023 gesetzlich verankert, mit flexibleren Haushalts- und Förderregeln ([Gesetzestext](https://www.gesetze-im-internet.de/sprindfg/BJNR19F0A0023.html)).
- Gründungsdirektor: Rafael Laguna de la Vera.

**Die Rolle im EUDI-Projekt**

| Rolle | Akteur | Quelle |
| --- | --- | --- |
| Auftraggeber, politische Verantwortung | BMDS (bis Mai 2025: BMI) | [Projektseite](https://eudi-wallet.gov.de/ueber) |
| Projektleitung, Entwicklung der App, Aufbau des Ökosystems | SPRIND | Projektseite |
| Wallet-Anbieter und Orchestrator (2026) | Common Codes GmbH, aus SPRIND ausgegliedert | [Bug-Bounty-Meldung](https://eudi-wallet.gov.de/news/d-you-wallet-bug-bounty-programm), Handelsregister HRB 288219 |
| Partner | BSI, Bundesdruckerei, Fraunhofer AISEC, PwC, Agentur Meiré und Meiré | Projektseite |
| Aufsicht über Wallets (laut DIdG) | Bundesnetzagentur | [Bundestag](https://www.bundestag.de/dokumente/textarchiv/2026/kw41-pa-digitales-1218122) |

**Arbeitsweise im Projekt**

- Innovationswettbewerb statt klassischer Ausschreibung: Der Funke-Wettbewerb lief 15 Monate in drei Stufen; Förderung bis zu 300.000 € je Team in Stufe 1 und 2, bis zu 450.000 € je Finalist in Stufe 3 ([SPRIND](https://www.sprind.org/en/actions/challenges/eudi-wallet-prototypes)).
- Dokumentation öffentlich auf openCoDE, Feedback über Issues; regelmäßige „Open Online Consultations“ ([News](https://eudi-wallet.gov.de/news)).
- Die öffentlichen Code-Repositories enthalten Forks der Bibliotheken aus der Referenzimplementierung der EU-Kommission ([GitHub](https://github.com/german-national-wallet)).

Hinweis für den Vortrag: Dass eine Innovationsagentur eine dauerhaft zu betreibende staatliche Infrastruktur entwickelt, ist ungewöhnlich. Das ist eine sachliche Beobachtung; die Übergabe an Common Codes ist die Antwort des Projekts auf die Betriebsfrage.

## Teil 5: Berichterstattung (5–7 Min.)

Kernaussage: Die Fachpresse berichtet überwiegend kritisch über Sicherheit, Datenschutz und Zeitplan; allgemeine und Wirtschaftsmedien berichten eher über Start, Nutzen und Partner. Für einen nüchternen Vortrag lohnt es sich, jeden Kritikpunkt mit der öffentlichen Antwort der Regierung zu paaren.

**Auswahl an Berichten (chronologisch)**

| Datum | Medium | Art | Kernpunkt |
| --- | --- | --- | --- |
| 2024 | [netzpolitik.org](https://netzpolitik.org/tag/sprind/) | Bericht | Funke-Wettbewerb und Zulassung eines Google-Teams; Zweifel an der Wirkung der Konsultation |
| 08.06.2026 | [Tagesspiegel Background](https://background.tagesspiegel.de/digitalisierung-und-ki/briefing/einblicke-in-ein-verkorkstes-projekt) (Bezahlinhalt) | Recherche | Beschreibt das Projekt als chaotisch, mit Interessenkonflikten und Zeitverzug; Anlass für eine Kleine Anfrage der Grünen |
| 09.09.2026 | [Behörden Spiegel](https://www.behoerden-spiegel.de/2026/09/09/d-you-deutschland-gibt-der-eudi-wallet-ein-gesicht/) | Bericht | Sachliche Vorstellung von Name, Logo und Ökosystem |
| Sept. 2026 | [ZDFheute](https://www.zdfheute.de/politik/deutschland/digitale-brieftasche-wildberger-vorstellung-name-100.html) | Analyse | Fragt, ob die App rechtzeitig fertig wird; Experten fürchten geringe Attraktivität zum Start |
| 10.09.2026 | [netzpolitik.org](https://netzpolitik.org/2026/neuer-name-alte-baustellen-das-sind-die-huerden-zum-start-der-digitalen-brieftasche-d-you/) | Bericht | Start „deutlich kleiner als geplant“; BSI-Richtlinie TR-03189 erst Ende 2026; Streit um signierte Daten |
| Sept. 2026 | [Lebensmittel Zeitung](https://www.lebensmittelzeitung.net/politik/nachrichten/digitaler-identitaetsnachweis-handel-begruesst-digitale-brieftasche-d-you-193240) | Bericht | Handel (HDE als Launch-Partner) knüpft große Erwartungen an d-you |
| 24.09.2026 | [netzpolitik.org](https://netzpolitik.org/2026/bundestag-debattiert-ueber-digitale-brieftasche-100-tage-vor-dem-start-waechst-die-kritik-an-d-you/) | Bericht | Bundestagsdebatte: Kritik von Grünen, Linken und vzbv; Kommunen kaum vorbereitet |
| 17.10.2026 | [heise online / iX](https://www.heise.de/meinung/Kommentar-Bei-der-d-you-jetzt-nicht-anfangen-aufzuhoeren-11490834.html) | Kommentar | Trotz Kritik „ziemlich gute Voraussetzungen“; lobt Verzicht auf Google Play Integrity, bemängelt nicht offengelegte Schutzkomponente und fehlende Nachweise |
| Okt. 2026 | [Tagesspiegel](https://www.tagesspiegel.de/berlin/der-ausweis-zieht-aufs-handy-um-deutschland-startet-digitale-brieftasche-eudi-wallet-16191857.html) | Kolumne | Positiv, aus Nutzersicht |

**Die wiederkehrenden Streitpunkte – Kritik und Gegenposition**

| Thema | Kritik (wer) | Position der Regierung / des Projekts |
| --- | --- | --- |
| Signierte Daten statt „authentifiziertem Kanal“ | Signaturen machen Daten dauerhaft fälschungssicher und damit wertvoll für Datenhandel (BSI, BfDI, Forschende laut netzpolitik.org; vzbv-Gutachten) | Ein authentifizierter Kanal würde den Aussteller bei jeder Nutzung einbinden; signierte Daten seien besser gegen Beobachtung; Entscheidung mit Zustimmung des BSI (Drs. 21/7319) |
| Fehlende Pseudonyme und Zero-Knowledge-Proofs | Grüne, Linke, vzbv, BfDI | EU-Spezifikationen fehlen noch; Nachlieferung im iterativen Verfahren; Bundestag fordert per Entschließung Priorität |
| Sicherheit und Zeitplan | BSI-Vorgaben erst Ende 2026; Sicherheitsberatung spät ausgeschrieben (Bianca Kastl via Tagesspiegel Background, netzpolitik.org); Smartphones ohne Updates (Jiska Classen, Anhörung) | Pentests, beschleunigte Sicherheitszertifizierung, Bug-Bounty, offener Quellcode; Start „unter Berücksichtigung eventueller Restrisiken“ |
| Abhängigkeit von Apple und Google | Vertrieb nur über deren App-Stores; Sorge um Play Integrity (u. a. Linke-Antrag, Fachblogs) | Kein Konto nötig, keine Play Integrity; alternative App-Stores „angestrebt“ |
| Registrierung der Dienste | Kein Prüfen, ob abgefragte Daten nötig sind; Gefahr eines „Cookie-Banner 2.0“ (Bianca Kastl, vzbv) | Registrar prüft Identität und Angaben, nicht die Angemessenheit; das sei EU-rechtlich nicht vorgesehen (Drs. 21/7319) |
| Nutzen zum Start | Wenig Nachweise, Kommunen nicht bereit, Online-Ausweis mit PIN als Hürde (Landkreistag, heise, Tagesspiegel Background) | Start sei „Beginn der Skalierung“ (SPRIND); rund 40 Launch-Partner |

**Hinweise zur Einordnung im Vortrag**

- Zwischen Bericht, Kommentar und Kolumne unterscheiden; Kommentarspalten unter Artikeln sind nicht repräsentativ.
- netzpolitik.org versteht sich als Medium für digitale Grundrechte; Tagesspiegel Background ist ein Fachdienst hinter Bezahlschranke. Beides offen benennen.
- Abweichung zum Startumfang: Die Regierung nennt im Juli 2026 PID und Nachweise (z. B. Führerschein); netzpolitik.org berichtet nach der Namensvorstellung im September, zunächst sei nur der Ausweis nutzbar. Vor dem Vortrag den aktuellen Stand prüfen.

## Quellen

**Primärquellen (Teil 1–4)**

- [Verordnung (EU) 2024/1183, EUR-Lex](https://eur-lex.europa.eu/eli/reg/2024/1183/oj)
- [Durchführungsverordnung (EU) 2024/2979](https://eur-lex.europa.eu/eli/reg_impl/2024/2979/oj) und [(EU) 2025/848](https://eur-lex.europa.eu/eli/reg_impl/2025/848/oj)
- [Europäisches Parlament, Legislative Train: Revision of eIDAS](https://www.europarl.europa.eu/legislative-train/spotlight-JD22/file-eid)
- [EU-Kommission: Durchführungsrechtsakte 28.11.2024](https://digital-strategy.ec.europa.eu/en/news/commission-adopts-technical-standards-cross-border-european-digital-identity-wallets), [Einigung 2023](https://digital-strategy.ec.europa.eu/en/news/commission-welcomes-final-agreement-eu-digital-identity-wallet), [Großpiloten](https://digital-strategy.ec.europa.eu/en/policies/eudi-wallet-implementation)
- [Architecture and Reference Framework (ARF)](https://eu-digital-identity-wallet.github.io/eudi-doc-architecture-and-reference-framework/arf)
- [eudi-wallet.gov.de: Startseite](https://eudi-wallet.gov.de), [Projekt](https://eudi-wallet.gov.de/ueber), [App](https://eudi-wallet.gov.de/app), [d-you-Vorstellung](https://eudi-wallet.gov.de/news/d-you-name-logo-eudi-wallet), [Bug-Bounty](https://eudi-wallet.gov.de/news/d-you-wallet-bug-bounty-programm), [Digitale Nachweise](https://eudi-wallet.gov.de/news/digitale-nachweise-einfach-sicher-datensparsam)
- [Architekturdokumentation der staatlichen Wallet (openCoDE)](https://bmi.usercontent.opencode.de/eudi-wallet/wallet-development-documentation-public/latest/)
- [Quellcode auf GitHub](https://github.com/german-national-wallet)
- [Bundestag: Antwort der Bundesregierung, Drucksache 21/7319](https://dserver.bundestag.de/btd/21/073/2107319.pdf)
- [Bundestag: Digitale Identitätengesetz, Beratungsverlauf](https://www.bundestag.de/dokumente/textarchiv/2026/kw42-de-digitale-identitaeten-gesetz-1223586) und [Anhörung 06.10.2026](https://www.bundestag.de/dokumente/textarchiv/2026/kw41-pa-digitales-1218122)
- [SPRIND: Funke EUDI Wallet Prototypes](https://www.sprind.org/en/actions/challenges/eudi-wallet-prototypes), [Über SPRIND](https://www.sprind.org/en/we)
- [SPRIND-Freiheitsgesetz](https://www.gesetze-im-internet.de/sprindfg/BJNR19F0A0023.html)
- [Bitkom: MoU EUDI-Wallet](https://www.bitkom.org/MoU-EUDI-Wallet)

**Medien und Stellungnahmen (Teil 5)**

- [netzpolitik.org, 10.09.2026](https://netzpolitik.org/2026/neuer-name-alte-baustellen-das-sind-die-huerden-zum-start-der-digitalen-brieftasche-d-you/) und [24.09.2026](https://netzpolitik.org/2026/bundestag-debattiert-ueber-digitale-brieftasche-100-tage-vor-dem-start-waechst-die-kritik-an-d-you/)
- [Tagesspiegel Background, 08.06.2026](https://background.tagesspiegel.de/digitalisierung-und-ki/briefing/einblicke-in-ein-verkorkstes-projekt) (Bezahlinhalt, nur Anriss gelesen)
- [heise online, Kommentar 17.10.2026](https://www.heise.de/meinung/Kommentar-Bei-der-d-you-jetzt-nicht-anfangen-aufzuhoeren-11490834.html) (nur Anriss gelesen)
- [ZDFheute](https://www.zdfheute.de/politik/deutschland/digitale-brieftasche-wildberger-vorstellung-name-100.html), [Behörden Spiegel](https://www.behoerden-spiegel.de/2026/09/09/d-you-deutschland-gibt-der-eudi-wallet-ein-gesicht/), [Lebensmittel Zeitung](https://www.lebensmittelzeitung.net/politik/nachrichten/digitaler-identitaetsnachweis-handel-begruesst-digitale-brieftasche-d-you-193240), [Tagesspiegel-Kolumne](https://www.tagesspiegel.de/berlin/der-ausweis-zieht-aufs-handy-um-deutschland-startet-digitale-brieftasche-eudi-wallet-16191857.html)
- [vzbv: Stellungnahme zum DIdG](https://www.vzbv.de/pressemitteilungen/digitale-brieftasche-d-you-bundestag-muss-beim-schutz-sensibler-daten)

## Anhang: Position der Grünen-Bundestagsfraktion

Kernaussage: Die Grünen befürworten eine EUDI-Wallet grundsätzlich, haben das Digitale Identitätengesetz am 15.10.2026 aber abgelehnt, weil sie Datenschutz, Sicherheit und digitale Souveränität zum Start für unzureichend abgesichert halten. Ebenfalls mit Nein stimmten Linke und AfD; die AfD lehnt die EU-Wallet anders als die Grünen grundsätzlich ab.

**Abstimmungsverhalten**

| Datum | Vorgang | Ergebnis | Quelle |
| --- | --- | --- | --- |
| 14.10.2026 | Digitalausschuss: Gesetz in geänderter Fassung | Union und SPD dafür, alle anderen Fraktionen dagegen | [Bundestag](https://www.bundestag.de/dokumente/textarchiv/2026/kw42-de-digitale-identitaeten-gesetz-1223586) |
| 15.10.2026 | Bundestag: Gesetz und Entschließung zur Pseudonymfunktion | Angenommen mit Koalitionsmehrheit gegen AfD, Grüne und Linke | Bundestag |
| 15.10.2026 | Entschließungsantrag der Grünen ([Drucksache 21/8624](https://dserver.bundestag.de/btd/21/086/2108624.pdf)) | Abgelehnt | Bundestag |

**Begründung laut Ausschussbericht und Debatte**

- Die Fraktion unterstütze die Einführung der Wallet, sehe aber weiterhin erhebliche Defizite bei Datenschutz, Nutzerfreundlichkeit und digitaler Souveränität. Die Änderungen im Ausschuss seien sinnvoll, lösten die grundlegenden Probleme aber nicht ([Bundestag, Ausschussbericht 14.10.2026](https://www.bundestag.de/dokumente/textarchiv/2026/kw42-de-digitale-identitaeten-gesetz-1223586)).
- Die pseudonyme Nutzung sei ein zentraler Schutzmechanismus und müsse möglichst früh verfügbar sein; außerdem fragte die Fraktion, wie das Ministerium die Kommunen bei der Anbindung unterstützen will (ebd.).
- Rebecca Lenhard kritisierte in der ersten Lesung am 23.09.2026, dass die Wallet zum Start weder Pseudonyme noch Zero-Knowledge-Proofs biete, und hielt die Kommunen für unzureichend vorbereitet (berichtet von [netzpolitik.org](https://netzpolitik.org/2026/bundestag-debattiert-ueber-digitale-brieftasche-100-tage-vor-dem-start-waechst-die-kritik-an-d-you/); Rede in der [Bundestags-Mediathek](https://www.bundestag.de/dokumente/textarchiv/2026/kw42-de-digitale-identitaeten-gesetz-1223586)).
- Bereits im Sommer 2026 hatte die Fraktion per Kleiner Anfrage nach Zeitplan, Funktionsumfang, Architektur und möglichen Interessenkonflikten gefragt; die Antwort ist Drucksache 21/7319 (siehe Teil 2 und 3).

**Forderungen im Entschließungsantrag (Drs. 21/8624, Auswahl)**

| Bereich | Forderung |
| --- | --- |
| Start und Funktionsumfang | Eine Wallet erst bereitstellen und notifizieren, wenn alle eIDAS-Funktionen und Schutzmechanismen, insbesondere Pseudonyme, umgesetzt und zertifiziert sind; eine Version mit eingeschränktem Umfang nur mit geprüftem Datenschutz, geprüfter IT-Sicherheit und Pseudonymfunktion |
| Pseudonyme | Pseudonyme Nutzung als Voreinstellung, sofern keine gesetzliche Identifizierungspflicht besteht; Dienste sollen eine Identifizierungspflicht bei der Registrierung rechtlich begründen |
| Datenabfragen | Risikobasiertes Prüfsystem, das Abfragen auf das Nötige begrenzt; Altersnachweis ohne Offenlegung der Identität; Meldesystem in der Wallet, Bußgelder und Entzug der Registrierung |
| Digitale Souveränität | Keine Anerkennung von Torwächtern nach dem Digital Markets Act als Wallet-Anbieter; Nutzbarkeit auch ohne Produkte außereuropäischer Anbieter, etwa auf alternativen Betriebssystemen |
| Technik | Staatliche Wallet frühestmöglich auch ohne Cloud-Komponenten nutzbar; Tracking des Nutzungsverhaltens wirksam verhindern |
| Biometrie | Passbild in den Identitätsdaten nur per Opt-in, ohne Nachteile bei Ablehnung; kein automatisierter Austausch biometrischer Daten zwischen Pass- und Ausweisbehörden |
| Freiwilligkeit und Haftung | Alternative Identifizierungswege erhalten, Beschwerdestelle einrichten; klare Haftungsregeln für Verbraucherinnen und Verbraucher |
| Parlament und Kontrolle | Wesentliche Entscheidungen beim Parlament; BSI und BfDI früh und verbindlich einbeziehen; transparente, unabhängig überprüfbare Entwicklung |
| Verwaltung und Wirtschaft | Bessere Anbindung von Ländern und Kommunen; Behörden sollen Nachweise fristgerecht ausstellen; European Business Wallet zügig und interoperabel umsetzen |

Hinweis für den Vortrag: Einige Forderungen decken sich mit dem, was die Koalition per Entschließung beschlossen hat (Pseudonymfunktion schnell nachliefern), andere gehen deutlich weiter (Start erst mit vollem eIDAS-Umfang). Der Unterschied liegt also vor allem im Zeitpunkt und in der Frage, ob ein Start mit Teilfunktionen vertretbar ist.

## Transparenzhinweis

Recherche mit Claude Opus 5.5, High, Nov 3, 2026, 21:26 Uhr

```markdown
Strukturiere mir bitte einen 20 bis 30-minütigen Vortrag zur EUDI-Wallet [https://eudi-wallet.gov.de](https://eudi-wallet.gov.de) und der deutschen Umsetzung d-you. Ich würde im Vortrag gerne mit der europäischen Idee dazu beginnen, dann was zum generellen Projekt erfahren (also seit wann das läuft, welche Meilensteine es gab, etc), dann was zur deutschen Version der d-you App und dann auch gerne noch kurz etwas zu SPRIND die das in Deutschland ja umsetzen. Beziehe erstmal nur primäre Quellen ein. Es ist mir sehr wichtig, dass alle Informationen korrekt sind. Außerdem ist es wichtig, dass die Informationen nüchtern sind und das keine Propagandaveranstaltung wird. Nur im letzten Teil des Vortrags (5-7 Minuten) möchte ich was zur Berichterstattung dazu haben.
```
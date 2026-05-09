# Plant content review

Sisältöluonnokset tarkistettavaksi ennen `plants.ts`-konversiota.

**Prosessi:** Riku lukee jokaisen kasvin, muuttaa `reviewStatus`-arvoa ja kommentoi tarvittavat korjaukset. Vasta kun koko listan kasvit ovat `approved`, sisältö konvertoidaan `src/data/plants.ts`-tiedostoon.

**reviewStatus**-arvot: `draft` (ehdotus, vielä luonnos) → `needs_review` (kirjoittaja pyytää tarkennusta) → `approved` (hyväksytty konversiota varten) → `rejected` (poistetaan listalta).

Kaikki kasvit aloittavat tasolla `draft`.

**Lähdemerkintä:** Jokaisella kasvilla URL-pohjaiset lähteet. **Wikipedia on supplemental-lähde** — se voi täydentää, mutta ei riitä yksinään turvallisuuskriittisessä sisällössä. **Pinkka, SLL, Luontoportti, Myrkytystietokeskus, Lääketietokeskus** -URL:t juurihaara-tasolla — Riku täydentää lajikohtaiset syvälinkit ennen `approved`-statusta.

**Approval-invariantit:**

- **#9** — `reviewStatus === 'approved'` vaatii `sources.length >= 1` ja jokaisella sourcella validi URL-muoto.
- **#10** — Approved-kasvilla vähintään **1 non-Wikipedia-lähde**. Wikipedia ei riitä yksinään.
- **#11** — Jos `warnings` sisältää lääke-/raskaus-/allergia-/munuais-/myrkytysavainsanan (`'allergi'`, `'raskaud'`, `'imet'`, `'munuais'`, `'aspiriin'`, `'salisylaat'`, `'verenohennu'`, `'NSAID'`, `'diabete'`, `'oksaalihap'`, `'kihti'`, `'fytoestrogeeni'`, `'sappi'`, `'sedatiiv'`, `'hormon'`, `'lääke'`, `'astm'`, `'myrk'`, `'reuma'`, `'tukkeum'`, `'reye'`, `'syövä'`), vähintään 1 source on auktoriteettinen lääketieteellinen tai myrkytyslähde — Lääketietokeskus, Myrkytystietokeskus, THL, Duodecim, Helda Helsinki tai vastaava asiantuntijalähde.

Rikottu invariantti estää konversion `plants.ts`-tiedostoon — `draft`/`needs_review` -tilaa se ei estä.

---

## 1. Nokkonen

- **Latinankielinen nimi:** *Urtica dioica*
- **reviewStatus:** draft
- **Ehdotus:** difficulty=`easy`, beginnerFriendly=`true`
- **Kuukaudet:** toukokuu–syyskuu (parhaat lehdet touko–kesäkuu, ennen kukintaa)
- **Elinympäristöt:** ravinteinen multainen maa, pihanurkat, pellonpienet, ojanvarret, asuinpaikat

### Tunnistus

Pystykasvuinen 30–150 cm korkea ruohovartinen monivuotinen. Vastakkaiset, sahalaitaiset, sydänmäiset/munuaismaiset lehdet. Selvä tuntomerkki: koko kasvi (varsi ja lehtien alapuoli) peitetty polttokarvoilla, jotka kirvelevät kosketuksesta. Pieniä viheriäisiä kukkia ripsuissa lehtien hangoissa. Nais- ja urosyksilöt erikseen.

### Syötävät osat

Nuoret versot ja lehdet, parhaiten ennen kukintaa. Siemenet myöhemmin ravinnelisänä.

### Käyttötavat

Nokkoskeitto, -smoothie, -patukka, kuivattu lehti teeksi, siemenet myslin sekaan. Lehdet on aina kuumennettava, kuivattava tai soseutettava — polttokarvat menettävät tehonsa. Perinteisesti myös kuitukasvi.

### safetyNote

"Käytä käsineitä keräillessä — polttokarvat kirvelevät ihoa. Älä syö raakana. Polton karvat poistuvat kuumennettaessa, kuivattaessa tai vahvalla soseuttamisella. Munuaissairaat ja diureetteja käyttävät: konsultoi lääkäriä korkean kalium- ja oksaalihappopitoisuuden vuoksi."

### warnings

- Polttokarvat: käytä käsineitä keräillessä
- Älä kerää kukkimisen jälkeen — vanhempien lehtien kalsiumkidemuodostumat ärsyttävät virtsateitä
- Munuaissairaus, diureettilääkitys: konsultoi lääkäriä
- Mahdollinen yliherkkyys: kokeile pieni määrä ensin

### lookalikes

| Laji | dangerLevel | howToDifferentiate |
|---|---|---|
| Valkopeippi (*Lamium album*) | matala | Valkopeipin lehdet ovat samanmuotoiset, mutta kasvilla EI ole polttokarvoja eikä se kirvele. Kukinnot ovat valkoiset huulikukat, eivät pieniä viheriäisiä ripsuja. |
| Rautanokkonen (*Lamium purpureum*) | matala | Vaaleanpunaiset huulikukat, ei polttokarvoja, lehdet pyöreämmät ja sileämmät. |

### Lähteet

- **Wikipedia: Nokkonen** — https://fi.wikipedia.org/wiki/Nokkonen — Wikipedia
- **Pinkka virtuaalikasvio** — https://pinkka.helsinki.fi/virtuaalikasvio/ — Helsingin yliopisto
- **Suomen Luonnonsuojeluliitto** — https://www.sll.fi/ — Suomen Luonnonsuojeluliitto
- **Ruokavirasto: villikasvien käyttö** — https://www.ruokavirasto.fi/ — Ruokavirasto
- **Lääketietokeskus: munuaiset ja allergiat** — https://www.laaketietokeskus.fi/ — Lääketietokeskus

---

## 2. Voikukka

- **Latinankielinen nimi:** *Taraxacum officinale* (kollektiivilaji, useita pieniä apomiksen variantteja)
- **reviewStatus:** draft
- **Ehdotus:** difficulty=`easy`, beginnerFriendly=`true`
- **Kuukaudet:** toukokuu–syyskuu (parhaat lehdet alkukesä, kukat touko–kesäkuu, juuret syksy)
- **Elinympäristöt:** nurmikot, pellonpiennat, pihat, niityt, tienvarret (vältä saastuneita)

### Tunnistus

Matala ruusukekasvi. Liuskoittuneet, alaspäin osoittavat hampaiset lehdet ("leijonan hammas"). Yksittäinen kirkkaankeltainen mykerökukka onton, lehdettömän, maitiaisnesteisen varren päässä. Kukinnan jälkeen valkoinen pallomainen lentoilman siemenikoste ("voikukan kello"). Maitiaisneste vuotaa kun varsi tai juuri katkaistaan.

### Syötävät osat

Lehdet (nuorina), kukat, nuput, juuret.

### Käyttötavat

Lehdet salaatissa nuorina (vanhetessa kitkerät), kukat hunajaksi tai siirapiksi, juuri paahdettuna kahvinkorvikkeena, nuput kapriksen tapaan suolaliemessä.

### safetyNote

"Voikukka on yksi turvallisimmista, mutta varmista tunnistus: yksittäinen keltainen mykerökukka onton varren päässä, maitiaisneste varressa. Vältä keräämistä ruiskutetuilta nurmikoilta, teiden varsilta ja pihoilta, joissa on käytetty rikkakasvitorjunta-aineita. Sappirakkosairaat: konsultoi lääkäriä."

### warnings

- Sappikivisairaus, sappirakon tukkeumat: voikukka kiihdyttää sappiaktiviteettia
- Diureetti- ja aspiriinilääkitys: yhteisvaikutuksen mahdollisuus
- Maitiaisneste voi ärsyttää ihoa
- Vältä saastuneet ja rikkakasviainekäsitellyt kasvupaikat

### lookalikes

| Laji | dangerLevel | howToDifferentiate |
|---|---|---|
| Keltano (*Hieracium*-lajit) | matala | Keltanolla useita pieniä keltaisia mykerökukkia haarautuvassa varressa. Voikukalla yksi kukka per varsi. Keltanon lehdet karvaiset. |
| Ahokeltano (*Pilosella*-lajit) | matala | Pieni mykerö, rönsyt, karvaiset lehdet, ei syvälle liuskoittunut. |
| Kärsähampainen (*Leontodon*) | matala | Useita pieniä keltakukkia haarauttuvassa varressa, ei yksittäistä. |

### Lähteet

- **Wikipedia: Voikukka** — https://fi.wikipedia.org/wiki/Voikukka — Wikipedia
- **Pinkka virtuaalikasvio** — https://pinkka.helsinki.fi/virtuaalikasvio/ — Helsingin yliopisto
- **Luontoportti** — https://www.luontoportti.com/ — Luontoportti
- **Suomen Luonnonsuojeluliitto** — https://www.sll.fi/ — Suomen Luonnonsuojeluliitto
- **Lääketietokeskus: sappirakko ja lääkeyhteisvaikutukset** — https://www.laaketietokeskus.fi/ — Lääketietokeskus

---

## 3. Maitohorsma

- **Latinankielinen nimi:** *Chamaenerion angustifolium* (synonyymi *Epilobium angustifolium*)
- **reviewStatus:** draft
- **Ehdotus:** difficulty=`easy`, beginnerFriendly=`true`
- **Kuukaudet:** kesäkuu–elokuu (versot toukokuussa, kukat heinä–elokuu)
- **Elinympäristöt:** paloalueet, hakkuuaukiot, pellonpiennat, raivion- ja raiteenvarret, valoisat metsänreunat

### Tunnistus

Korkea, 1–2 metriä, pystykasvuinen monivuotinen. Pitkät, kapeat, vuorottaiset, lähes pajun-mukaiset lehdet (siitä myös nimi *angustifolium* = kapealehtinen). Kirkkaan vaaleanpunaiset 4-terälehtiset kukat tiheässä terttukukinnossa varren päässä. Heinäkuussa näkyvät kukat tunnistavat lajin yksiselitteisesti.

### Syötävät osat

Nuoret versot keväällä (parsamaisesti), lehdet (parhaiten fermentoituna teeksi), kukat, juurakon ydin perinteisesti.

### Käyttötavat

Versot kuten parsa. Kuivatut lehdet "Iván chai" -tyyppiseksi fermentoitu mustateemaiseksi. Kukat koristeena salaatissa, hyytelössä, teessä. Voimakas mesikasvi.

### safetyNote

"Helposti tunnistettava kukinnan aikana kirkkaista vaaleanpunaisista terttukukinnoista ja kapeista pajunmukaisista lehdistä. Pelkät versot voivat sekoittua muihin kasveihin — parhaiten tunnistat valitsemalla kasvit kukkivien yksilöiden lähistöltä. Vältä keräämistä saastuneilta paloalueilta ja moottoritien varsilta."

### warnings

- Lievät sedatiiviset vaikutukset suurina annoksina
- Raskaus: vältä suuria määriä rohdoskäyttöä — perinteisesti käytetty, mutta tutkimusnäyttö puuttuu
- Vältä keräämistä saastuneilta tai jätemaa-alueilta

### lookalikes

| Laji | dangerLevel | howToDifferentiate |
|---|---|---|
| Rohtohorsma (*Epilobium hirsutum*) | matala | Lyhyempi (alle 1 m), karvaisempi, kukat pienemmät ja hempeämmin vaaleanpunaiset, eivät kirkkaat. Syötävä myös. |
| Muut Epilobium-lajit (mm. *E. parviflorum*, *E. montanum*) | matala | Pienempiä, kukat pienemmät. Kaikki syötäviä. |

### Lähteet

- **Wikipedia: Maitohorsma** — https://fi.wikipedia.org/wiki/Maitohorsma — Wikipedia
- **Pinkka virtuaalikasvio** — https://pinkka.helsinki.fi/virtuaalikasvio/ — Helsingin yliopisto
- **Luontoportti** — https://www.luontoportti.com/ — Luontoportti
- **Suomen Luonnonsuojeluliitto** — https://www.sll.fi/ — Suomen Luonnonsuojeluliitto
- **Lääketietokeskus: rohdoskasvit ja raskaus** — https://www.laaketietokeskus.fi/ — Lääketietokeskus

---

## 4. Mesiangervo

- **Latinankielinen nimi:** *Filipendula ulmaria*
- **reviewStatus:** draft
- **Ehdotus:** difficulty=`easy`, beginnerFriendly=`true`
- **Kuukaudet:** kesäkuu–elokuu (kukat parhaat heinäkuussa)
- **Elinympäristöt:** kosteat niityt, ojanvarret, rantaniityt, lehtometsät

### Tunnistus

50–150 cm pystykasvuinen monivuotinen. Vuorottaiset, parittomasti pariliuskeiset lehdet, alapuoli vaaleampi ja karvainen. Kerma-valkoiset, hyvin pienet, voimakastuoksuiset (mesimäinen tuoksu) kukat tiheässä huiskilossa varren päässä. Lehden silmuissa kasvavat pikkulehdykät erottavat lajin Filipendula-suvun muista lajeista.

### Syötävät osat

Kukat, lehdet (mausteena, ei suuria määriä), juuret rohdoksena.

### Käyttötavat

Kukat teen mausteeksi, kotiviinin maustamiseksi, sokerin maustamiseksi (mesiangervosokeri), siirappiin. Klassinen pohjoismainen rohdos kuume- ja särkylääkkeenä — kasvi sisältää salisylaatteja, joista aspiriini (asetyylisalisyylihappo) on synteettinen jatkokehitysmuoto.

### safetyNote

"Mesiangervo sisältää salisylaatteja, jotka muistuttavat aspiriinia vaikutukseltaan. ÄLÄ käytä jos olet allerginen aspiriinille tai NSAID-lääkkeille, käytät verenohennushoitoa, tai olet alle 16-vuotias (Reyen oireyhtymän riski). Astma- ja krooninen nuhasairaat: voi pahentaa oireita. Vältä raskausaikana suuria määriä. Älä syö ennen varmaa tunnistusta."

### warnings

- **Salisylaatti-/aspiriiniherkkyys:** vältä kokonaan
- **Lapset alle 16 v.:** Reyen oireyhtymän teoreettinen riski, vältä
- **Verenohennuslääkkeet** (varfariini, hepariini, klopidogreeli): yhteisvaikutus mahdollinen
- **Astma ja krooninen nuha:** voi pahentaa
- **Raskaus ja imetys:** vältä suuria määriä

### lookalikes

| Laji | dangerLevel | howToDifferentiate |
|---|---|---|
| Korpiangervo (*Filipendula vulgaris*) | matala | Kuivempien niittyjen laji, lehdet hienosti liuskaiset (lähes saniaiselehtisemmät). Sisältää myös salisylaatteja. |
| Tuomi (*Prunus padus*) -kukinto | matala | Tuomi on 3–10 m korkea pensas tai pikkupuu, ei ruohovartinen kasvi. Kukinnot riippuvat ja näyttävät samankaltaisilta vain kaukaa. |
| Pihlaja (*Sorbus aucuparia*) -kukinto | matala | Pihlaja on puu, kukinto pyöreämpi, lehdet leveästi pariliuskeiset. |

### Lähteet

- **Wikipedia: Mesiangervo** — https://fi.wikipedia.org/wiki/Mesiangervo — Wikipedia
- **Pinkka virtuaalikasvio** — https://pinkka.helsinki.fi/virtuaalikasvio/ — Helsingin yliopisto
- **Lääketietokeskus: salisylaattikasvit** — https://www.laaketietokeskus.fi/ — Lääketietokeskus
- **Suomen Luonnonsuojeluliitto** — https://www.sll.fi/ — Suomen Luonnonsuojeluliitto

---

## 5. Poimulehti

- **Latinankielinen nimi:** *Alchemilla vulgaris* (kollektiivilaji)
- **reviewStatus:** draft
- **Ehdotus:** difficulty=`easy`, beginnerFriendly=`true`
- **Kuukaudet:** kesäkuu–syyskuu
- **Elinympäristöt:** niityt, pellonpiennat, lehtometsät, pihat, tienvarret

### Tunnistus

Matala 10–40 cm monivuotinen. Pyöreät, käsimäisesti laskostuneet lehdet, hammaslaitaiset, sileän vihreät. Tyypillinen tuntomerkki: lehden uurteissa kerääntyy aamulla suuria kastepisaroita, jotka pysyvät paikallaan ja heijastavat valoa kuin lasihelmet (alkemistien "elämän vesi", siitä latinankielinen nimi *Alchemilla*). Pieniä, vaalean kelta-vihreitä kukkia haarautuvassa kukinnossa.

### Syötävät osat

Lehdet, kukat, juuri rohdoksena.

### Käyttötavat

Lehdet teehen (perinteisesti naistenrohto), nuorina salaatissa (mieto, hieman tanniinin makua), juuri rohdoksena. Klassinen suomalainen rohtokasvi kuukautisten ja vatsavaivojen helpotukseen.

### safetyNote

"Poimulehti tunnistetaan käsimäisesti laskostuneista pyöreistä lehdistä ja niiden kastepisarakeräämisestä aamulla. Älä syö ennen varmaa tunnistusta. Sisältää tanniineja — suuret määrät voivat ärsyttää vatsaa. Raskaus: perinteisesti naistenrohto, vältä suuria määriä."

### warnings

- Sisältää tanniineja: suuret määrät ärsyttävät ruoansulatusta
- Raskaus: vältä rohdoskäyttöä — perinteisestä käytöstä huolimatta vaikutus kohtuun teoreettisesti mahdollinen
- Lapset: pieniä määriä OK

### lookalikes

| Laji | dangerLevel | howToDifferentiate |
|---|---|---|
| Muut Alchemilla-lajit (kymmeniä Suomessa) | matala | Kaikki Alchemilla-suvun lajit ovat syötäviä ja samankaltaisia käyttöominaisuuksiltaan. |
| Hopeahanhikki (*Argentina anserina*) | matala | Pariliuskeinen lehti hopeisella alapuolella, ei käsimäisesti laskostunut. Syötävä myös. |

### Lähteet

- **Wikipedia: Poimulehdet** — https://fi.wikipedia.org/wiki/Poimulehdet — Wikipedia
- **Pinkka virtuaalikasvio** — https://pinkka.helsinki.fi/virtuaalikasvio/ — Helsingin yliopisto
- **Suomen Luonnonsuojeluliitto** — https://www.sll.fi/ — Suomen Luonnonsuojeluliitto
- **Lääketietokeskus: rohdoskasvit ja raskaus** — https://www.laaketietokeskus.fi/ — Lääketietokeskus

---

## 6. Piharatamo

- **Latinankielinen nimi:** *Plantago major*
- **reviewStatus:** draft
- **Ehdotus:** difficulty=`easy`, beginnerFriendly=`true`
- **Kuukaudet:** toukokuu–lokakuu
- **Elinympäristöt:** pihat, polut, tienvarret, tampatun maan reunat — viihtyy juuri tampatuilla paikoilla

### Tunnistus

Matala ruusukekasvi. Leveät soikeat, ehyt-/karkeasti hammaslaitaiset lehdet, joissa 5–9 selvää suoraa pitkittäissuonta lehden läpi. Suonten suoruus on varma tuntomerkki — nostaaksesi katkaise lehti, ja näet rihmamaiset suonet venyvän. Pitkä, ohut, pystykasvuinen kukkatähkä ruusukkeen keskeltä, pieniä viheriäisiä kukkia.

### Syötävät osat

Lehdet (nuorina parempia), siemenet.

### Käyttötavat

Lehdet salaatissa (kuitumaiset, makuun tottuminen vie hetken), keitetty pinaatin tapaan, jauhettuna haavojen sidos- ja itikanpurematalkki perinteisesti. Siemenet psyllium-tyyppisenä kuituna leivontaan tai vatsan toiminnan helpotukseen. Tee yskään ja ärtyneen kurkun rauhoitukseen.

### safetyNote

"Piharatamo on yksi turvallisimmista aloittelijan villiyrteistä — selvät pitkittäissuonet lehdellä ovat tuntomerkki. Kasvi viihtyy juuri tampatuilla pihoilla ja poluilla, joten ole erityisen tarkka kasvupaikan saastumisesta: vältä koirien käyttämiä alueita ja teiden välittömiä reunuksia."

### warnings

- Plantago-allergia mahdollinen (harvinainen)
- Siemenissä psyllium-kuitua — käytä runsaasti vettä, muuten suolitukoksen riski
- Vältä saastuneita pihoja ja teiden reunuksia

### lookalikes

| Laji | dangerLevel | howToDifferentiate |
|---|---|---|
| Heinäratamo (*Plantago lanceolata*) | matala | Kapeat suikeat lehdet, ei leveät. Syötävä, käyttö samanlainen. |
| Ahoratamo (*Plantago media*) | matala | Lehdet vaaleanharmaammat ja karvaisemmat, kukinto vaaleanpunainen. Syötävä. |

### Lähteet

- **Wikipedia: Piharatamo** — https://fi.wikipedia.org/wiki/Piharatamo — Wikipedia
- **Pinkka virtuaalikasvio** — https://pinkka.helsinki.fi/virtuaalikasvio/ — Helsingin yliopisto
- **Luontoportti** — https://www.luontoportti.com/ — Luontoportti
- **Suomen Luonnonsuojeluliitto** — https://www.sll.fi/ — Suomen Luonnonsuojeluliitto
- **Lääketietokeskus: allergiat ja kuitulisät** — https://www.laaketietokeskus.fi/ — Lääketietokeskus

---

## 7. Ahomansikka

- **Latinankielinen nimi:** *Fragaria vesca*
- **reviewStatus:** draft
- **Ehdotus:** difficulty=`easy`, beginnerFriendly=`true`
- **Kuukaudet:** kesäkuu–elokuu (marjat heinäkuussa kypsiä)
- **Elinympäristöt:** valoisat metsänreunat, pellonpiennat, hakkuuaukiot, rinteet

### Tunnistus

Matala rönsymäinen monivuotinen. Kolmilehtiset, hammaslaitaiset, kirkkaanvihreät lehdet, alapuoli vaalea ja karvainen. Pienet valkoiset 5-terälehtiset kukat. Marja: pieni (alle 1 cm), kirkkaan punainen, ulospäin törröttävät pintaiset siemenet ("kanttisiemenet"), tunnusomaisen voimakas ja makea aromi — selvästi tuntuvampi kuin viljellyllä mansikalla.

### Syötävät osat

Marjat, lehdet (parhaita ennen kukintaa).

### Käyttötavat

Marjat suoraan, kakkuihin, hilloihin (vaikea saada paljoa kerralla), juomien koristeena. Lehdet teehen ympäri vuoden — kuivattu lehti säilyttää aromin pitkään.

### safetyNote

"Ahomansikka tunnistetaan kolmilehtisistä lehdistä, valkoisista kukista ja pienistä kirkkaanpunaisista marjoista, joiden siemenet törröttävät ulospäin. Älä syö marjoja jos kasvi ei ole selvästi mansikkasuvun edustaja. Mansikka-allergia on yleinen — kokeile varovasti ensimmäistä kertaa."

### warnings

- Mansikka-allergia: pistely tai turvotus — vältä jatkossa
- Lehtitee raskaana: ei riittävää tutkimusnäyttöä, käytä kohtuullisesti

### lookalikes

| Laji | dangerLevel | howToDifferentiate |
|---|---|---|
| Suomansikka (*Comarum palustre*) | matala | Tummanpunaiset (lähes mustanpunaiset) kukat, ei valkoiset. Marja on tumma, kuiva ja epäkypsän makuinen. Kasvaa rämeillä. |
| Kissankäpälä (*Antennaria dioica*) | matala | Ei marjoja lainkaan. Kuivien rinteiden harmaakarvainen kasvi. |
| Karhumansikka / lillukka (*Rubus saxatilis*) | matala | Pari iso punaista marjaa varren päässä, kasvi piikittömämpi, lehdet kolmilehtisiä mutta paksumpia ja matalampia. Syötävä. |

### Lähteet

- **Wikipedia: Ahomansikka** — https://fi.wikipedia.org/wiki/Ahomansikka — Wikipedia
- **Pinkka virtuaalikasvio** — https://pinkka.helsinki.fi/virtuaalikasvio/ — Helsingin yliopisto
- **Suomen Luonnonsuojeluliitto** — https://www.sll.fi/ — Suomen Luonnonsuojeluliitto
- **Lääketietokeskus: mansikka-allergia ja raskaus** — https://www.laaketietokeskus.fi/ — Lääketietokeskus

---

## 8. Puna-apila

- **Latinankielinen nimi:** *Trifolium pratense*
- **reviewStatus:** draft
- **Ehdotus:** difficulty=`easy`, beginnerFriendly=`true`
- **Kuukaudet:** kesäkuu–syyskuu
- **Elinympäristöt:** niityt, pellonpiennat, viljelysmaat, viheralueet

### Tunnistus

20–60 cm pystykasvuinen monivuotinen. Kolmilehdykäiset lehdet, joissa on usein vaalea V-kuvio lehden keskellä. Pyöreät, kerma-tummanpunaiset (purppuranpunaiset) kuulamuotoiset kukinnot varren päässä. Tukijatkulehti pyöreä, kukinto suoraan tukijatkulehden yläpuolella.

### Syötävät osat

Kukat, nuoret lehdet, versot.

### Käyttötavat

Kukat teehen (mausteinen, kevyesti makea), salaatissa, leipiin, hyytelöön. Versot ja lehdet salaatissa nuorina. Voimakas mesikasvi.

### safetyNote

"Puna-apila tunnistetaan kolmilehdyikäisistä lehdistä ja pyöreistä punaisista kuulamuotoisista kukinnoista. Sisältää fytoestrogeenejä (isoflavonoideja), joiden vuoksi vältä jos sinulla on hormoniherkkä syöpähistoria, olet raskaana, imetät, käytät hormonihoitoa, tai käytät verenohennuslääkitystä. Vältä keräämistä saastuneilta pelloilta."

### warnings

- **Hormoniherkät syövät** (rinta-, kohtu-, munasarjasyöpähistoria): vältä — fytoestrogeenivaikutus
- **Raskaus, imetys:** vältä rohdoskäyttöä
- **Hormonihoito:** voi häiritä — konsultoi lääkäriä
- **Verenohennuslääkkeet:** mahdollinen yhteisvaikutus
- Kohtuullinen kulinaari­käyttö (muutamia kukkia salaatissa) on terveille turvallista

### lookalikes

| Laji | dangerLevel | howToDifferentiate |
|---|---|---|
| Valkoapila (*Trifolium repens*) | matala | Valkoiset kukat, kasvi matala ja ryömivä, ei pystykasvuinen. Syötävä. |
| Mailanen (*Medicago*-suku) | matala | Keltaiset kukat (joissakin lajeissa violetit), kuopukkiset siemenet. Syötäviä. |
| Mesivirna (*Anthyllis vulneraria*) | matala | Keltaiset, kerma-/punaisemmat kukat tukijatkulehden takana, lehti pariliuskeinen ei kolmilehdykäinen. |

### Lähteet

- **Wikipedia: Puna-apila** — https://fi.wikipedia.org/wiki/Puna-apila — Wikipedia
- **Pinkka virtuaalikasvio** — https://pinkka.helsinki.fi/virtuaalikasvio/ — Helsingin yliopisto
- **Lääketietokeskus: fytoestrogeenit** — https://www.laaketietokeskus.fi/ — Lääketietokeskus
- **Suomen Luonnonsuojeluliitto** — https://www.sll.fi/ — Suomen Luonnonsuojeluliitto

---

## 9. Suolaheinä

- **Latinankielinen nimi:** *Rumex acetosa*
- **reviewStatus:** draft
- **Ehdotus:** difficulty=`easy`, beginnerFriendly=`true`
- **Kuukaudet:** toukokuu–syyskuu (lehdet parhaita kevät–alkukesä, ennen kukintaa)
- **Elinympäristöt:** niityt, pellonpiennat, ojanvarret, ravinteinen maa

### Tunnistus

30–80 cm pystykasvuinen monivuotinen. Pitkulaiset, keihäänmuotoiset (tylppä keihäs) lehdet, joiden tyvessä on selvät terävät "korvat" sivuille. Lehdet maistuvat selvästi happamilta (sitruunaiset) — varmistustuntumerkki. Punertava kukkavarsi heinäkuussa, pienet huiskilo-kukinnot.

### Syötävät osat

Lehdet (nuorina parhaita).

### Käyttötavat

Salaatissa pieninä määrinä (lemon-tyyppinen happamuus), keitossa (perinteinen suolaheinäkeitto), kalaruoissa, soseissa. Toimii samaan tapaan kuin sitruunamehu.

### safetyNote

"Suolaheinä tunnistetaan keihäänmuotoisista lehdistä, joiden tyvessä on terävät sivuille osoittavat 'korvat', sekä selvästi happamasta mausta. Sisältää oksaalihappoa. ÄLÄ käytä jos sinulla on munuaiskiviä, kihtiä, niveltulehduksia tai munuaissairaus. Älä syö suuria määriä — yksi annos lehtiä päivässä on terveen aikuisen yläraja. Älä syö ennen varmaa tunnistusta."

### warnings

- **Munuaiskivet, munuaissairaus:** VÄLTÄ — oksaalihappo lisää kalsiumoksalaattikivien riskiä
- **Kihti, reuma:** vältä — oksaalihappo lisää virtsahappopitoisuutta
- **Raskaus, imetys:** vältä suuria määriä
- **Lapset:** pieniä määriä salaatissa OK, ei pääravintona
- **Kalsium-imeytymisen häiriö** suurilla annoksilla — varovaisuus osteoporoosin yhteydessä

### lookalikes

| Laji | dangerLevel | howToDifferentiate |
|---|---|---|
| Niittysuolaheinä (*Rumex acetosella*) | matala | Pienempi (10–30 cm), ohuemmat lehdet, sama hapan maku. Käyttö sama. |
| Heinätähti (*Rumex crispus*) | matala | Lehdet kihartuneet ja pidemmät, ei selviä keihäskorvia tyvessä. Lehdet syötäviä mutta hieman kitkerämpiä. |
| Hierakka (*Rumex longifolius*) | matala | Suuret leveät lehdet (jopa 30 cm), ei selvää happaman makua, ei keihäskorvia. Lehdet käyttökelpoisia keitettyinä. |

### Lähteet

- **Wikipedia: Suolaheinä** — https://fi.wikipedia.org/wiki/Suolaheinä — Wikipedia
- **Pinkka virtuaalikasvio** — https://pinkka.helsinki.fi/virtuaalikasvio/ — Helsingin yliopisto
- **Lääketietokeskus: oksaalihappo ja munuaisten terveys** — https://www.laaketietokeskus.fi/ — Lääketietokeskus
- **Suomen Luonnonsuojeluliitto** — https://www.sll.fi/ — Suomen Luonnonsuojeluliitto

---

## 10. Mustikka

- **Latinankielinen nimi:** *Vaccinium myrtillus*
- **reviewStatus:** draft
- **Ehdotus:** difficulty=`easy`, beginnerFriendly=`true`
- **Kuukaudet:** heinäkuu–syyskuu (marjat kypsyvät heinäkuun lopusta alkaen, paras aika elo–syyskuu)
- **Elinympäristöt:** vanhat kuusi-, mänty- ja sekametsät, varjoisat varvikkomailat, kuivahkot mailat

### Tunnistus

Matala 10–40 cm korkea varpu (puumainen pieni pensas). Vihreät, terävänkulmaiset (selvästi särmäkkäät) varret — varmistustuntomerkki. Pienet, soikeat, hammaslaitaiset, vuorottaiset, kirkkaanvihreät lehdet jotka putoavat syksyllä. Vihertävän vaaleanpunaiset, pienet, pyöreät, riippuvat kukat. Marja: pyöreä, sinimusta, sumumainen pintapöly, kasvilla yksittäin tai parittain. Marjan sisus tummanpunainen-violetti — värjää käden ja huulet näkyvästi.

### Syötävät osat

Marjat, lehdet.

### Käyttötavat

Marjat suoraan, hilloihin, mehuihin, kakkuihin, leivonnaisiin. Lehdet teehen (perinteisesti suolisto- ja silmärohtona). Marjojen mehu C-vitamiini- ja antosyaanilähde.

### safetyNote

"Mustikka tunnistetaan matalasta varpumaisesta kasvutavasta, kulmikkaista vihreistä varsista, pienistä soikeista lehdistä ja sinimustista marjoista, joiden mehu värjää käden voimakkaasti. Älä syö marjoja jos kasvi ei ole näkyvästi mustikkavarpu (huom. lookalike sudenmarja). Vältä keräämistä saastuneilta tienvarsilta. Verenohennushoitoa käyttävät: konsultoi lääkäriä lehtikäytöstä."

### warnings

- **Sudenmarja-lookalike:** ks. alla, opettele tunnistus huolella
- Lehtien pitkäaikainen runsas käyttö alentaa verensokeria — diabetes ja verensokerilääkitys: konsultoi lääkäriä
- Verenohennushoito: mahdollinen yhteisvaikutus runsaassa lehtikäytössä

### lookalikes

| Laji | dangerLevel | howToDifferentiate |
|---|---|---|
| Sudenmarja (*Paris quadrifolia*) | keskitaso | Sudenmarja kasvaa **yksittäisellä pystyvarrella**, jonka **päässä on yksi suuri sinimusta marja** ja **neljä leveää lehteä kiehkurana** marjan ympärillä. Mustikalla on **varpumainen monihaarainen pieni pensas**, jossa **useita pieniä marjoja** lehtien hangoissa. Sudenmarja on myrkyllinen — älä koskaan syö yksittäistä mustaa marjaa joka kasvaa neljän lehden kiehkuran keskellä. |
| Juolukka (*Vaccinium uliginosum*) | matala | Marja isompi, sinisempi, sumumaisempi, sisältä **vaalean vihreä-keltainen** (ei tummanpunainen kuin mustikalla). Kasvaa kosteilla rämeillä, mustikka kuivilla metsämailla. Syötävä, hieman vetisempi maku. |
| Variksenmarja (*Empetrum nigrum*) | matala | **Neulasmaiset, kapeat lehdet** (eivät leveät kuten mustikalla), pyöreä kiiltävän musta marja. Syötävä, mehukas mutta vähemmän makea. |
| Kanervan (*Calluna vulgaris*) marjamuodosteet (ei oikeasti marjoja) | matala | Kanervalla ei ole marjoja, vain pieniä kuivia siemeniä violetin kukan jälkeen. Sekoittaminen epätodennäköistä. |

### Lähteet

- **Wikipedia: Mustikka** — https://fi.wikipedia.org/wiki/Mustikka — Wikipedia
- **Wikipedia: Sudenmarja (lookalike)** — https://fi.wikipedia.org/wiki/Sudenmarja — Wikipedia
- **Pinkka virtuaalikasvio** — https://pinkka.helsinki.fi/virtuaalikasvio/ — Helsingin yliopisto
- **Suomen myrkytystietokeskus** — https://www.myrkytystietokeskus.fi/ — Myrkytystietokeskus
- **Suomen Luonnonsuojeluliitto** — https://www.sll.fi/ — Suomen Luonnonsuojeluliitto

---

## 11. Vadelma

- **Latinankielinen nimi:** *Rubus idaeus*
- **reviewStatus:** draft
- **Ehdotus:** difficulty=`easy`, beginnerFriendly=`true`
- **Kuukaudet:** kesäkuu–elokuu (marjat heinä–elokuu)
- **Elinympäristöt:** hakkuuaukiot, paloalueet, metsänreunat, tienvarret (vältä saastuneita), pihojen reunamat

### Tunnistus

1–2 m korkea pensas. Pystykasvuiset versot, joissa pieniä piikkejä. Pariliuskeinen lehti (3–5 lehdykkää), lehden alapuoli **selvästi vaalea, valkokarvainen** — varmistustuntomerkki. Valkoiset 5-terälehtiset kukat. Marja: kirkkaan punainen, kupukasvuinen rakeinen pinta. Kun kypsä marja irrotetaan, **se irtoaa kupun muotoisesti ja jättää keskelle valkean tappikuvun**. Tämä on yksiselitteinen tuntomerkki.

### Syötävät osat

Marjat, lehdet, nuoret versot keväällä.

### Käyttötavat

Marjat suoraan, hilloihin, mehuihin, leivonnaisiin. Lehdet teehen (parhaita ennen kukintaa). Versot keväällä parsamaisesti.

### safetyNote

"Vadelma tunnistetaan piikikkäistä versoista, lehtien valkeasta alapuolesta, ja marjasta, joka irrotettaessa jättää keskelle valkean tappikuvun. Älä syö ennen varmaa tunnistusta. Vältä keräämistä saastuneilta tienreunoilta. Raskaana olevat: lehtitee perinteisesti loppuraskauden rohto, mutta alkuraskaudessa vältettävä — konsultoi neuvolaa."

### warnings

- **Alkuraskaus:** vältä lehtiteen runsasta käyttöä — joitain tutkimuksia jotka eivät tue alkuraskautta
- **Loppuraskaus:** perinteisesti käytetty kohdun valmistautumiseen, mutta käytä vain neuvolan kanssa keskustellen
- Vadelma-allergia mahdollinen
- Vältä saastuneita tienreunoja

### lookalikes

| Laji | dangerLevel | howToDifferentiate |
|---|---|---|
| Mesimarja (*Rubus arcticus*) | matala | Pinkki marja, ei kupun, lehti kolmilehdykäinen, matala kasvi alle 30 cm. Syötävä, harvinainen ja arvokas. |
| Lillukka (*Rubus saxatilis*) | matala | Punainen marja, vain muutama rae, lehdet kolmilehdykäiset, kasvi matalampi. Syötävä. |
| Lakka (*Rubus chamaemorus*) | matala | Keltainen-oranssi kun kypsä, yksittäinen marja matalalla suokasvilla. Eri elinympäristö. |
| Karhunvatukka (*Rubus plicatus*, *R. nessensis*) | matala | Marja musta-tummanvioletti kypsänä, irrotettaessa **EI jätä valkeaa kupun** kuten vadelma — koko marja irtoaa kantaosineen. Piikit voimakkaammat. Syötävä. |

### Lähteet

- **Wikipedia: Vadelma** — https://fi.wikipedia.org/wiki/Vadelma — Wikipedia
- **Pinkka virtuaalikasvio** — https://pinkka.helsinki.fi/virtuaalikasvio/ — Helsingin yliopisto
- **Luontoportti** — https://www.luontoportti.com/ — Luontoportti
- **Suomen Luonnonsuojeluliitto** — https://www.sll.fi/ — Suomen Luonnonsuojeluliitto
- **Lääketietokeskus: vadelmanlehti ja raskaus** — https://www.laaketietokeskus.fi/ — Lääketietokeskus

---

## 12. Kuusenkerkät

- **Latinankielinen nimi:** *Picea abies* (kasvavat uudet kasvut, ns. "kerkät")
- **reviewStatus:** draft
- **Ehdotus:** difficulty=`easy`, beginnerFriendly=`false` (huom: marjakuusi-lookalike pakottaa invariantin #6 mukaan)
- **Kuukaudet (`months`-kentässä):** `toukokuu`, `kesäkuu`. Pohjois-Suomessa mahdollisesti heinäkuun alkuun, mutta tätä ei lisätä `months`-kenttään koska se aiheuttaisi väärän featured-suosituksen Etelä-Suomen heinäkuu-näkymässä. Pohjois-Suomi-huomio mainitaan `description`-tekstissä.
- **Elinympäristöt:** havumetsät, metsänreunat, kuusivaltaiset kuviot — luonnonvaraisesti

### Tunnistus

Kuusi tunnistetaan ensin: korkea, kapea, pyramidimainen havupuu (yleensä 10–30 m). Neulaset 1–2,5 cm pitkät, **4-tahkoisia** (pyörittäen tuntee tahkoja), terävät, **yksittäin oksassa** kierreasemaisesti. Kuusi tuoksuu havunmäiseltä mutta voimakkaammin kuin mänty.

Kerkkä = uusi kasvu oksankärjessä alkukesällä: vaalean vihreä, hento, pehmeä, mehevä, 1–4 cm pitkä. Selvästi erottuva tummemmasta vanhasta kasvusta. Kerää vain pieniä määriä per puu — älä riistele kaikkia kerkkiä yhdeltä yksilöltä, koska se vaurioittaa puuta.

### Syötävät osat

Vain kerkät (uudet vaalean vihreät kasvut), eivät vanhat tummanvihreät neulaset.

### Käyttötavat

Sirupiksi (kerkkäsiirappi klassikko), teen mausteeksi, etikan ja sokerin maustamiseen, salaattiin pieninä määrinä, käymisjuomiin (kerkkäolut perinteisesti). Korkea C-vitamiinipitoisuus — perinteinen kevätlannin ravinto.

### safetyNote

"Varmista että kasvi on KUUSI (*Picea abies*) eikä marjakuusi (*Taxus baccata*), joka on **erittäin myrkyllinen**. Marjakuusi ei kasva Suomessa luonnonvaraisena kuin etelärannikolla, mutta on yleinen koristekasvi puutarhoissa ja hautausmailla — ÄLÄ koskaan kerää kerkkiä puutarhasta tai pensaasta. Kerää vain metsästä luonnonvaraisesta korkeasta havupuusta. Käytä vain vaaleanvihreitä kerkkiä alkukesän aikana. Älä syö suuria määriä — terpeenit voivat ärsyttää vatsaa."

### warnings

- **Marjakuusi-vaara:** kerää vain metsän luonnonvaraisesta kuusesta, EI puutarhasta
- Suuret määrät: terpeenit voivat ärsyttää vatsaa ja munuaisia
- Raskaus: vältä suuria määriä rohdoskäyttöä
- Allergiset hengitysteiden sairaudet: havukasvien öljyt voivat ärsyttää
- Älä riistele yhden puun kaikkia kerkkiä — vaurioittaa kasvua

### lookalikes

| Laji | dangerLevel | howToDifferentiate |
|---|---|---|
| Marjakuusi (*Taxus baccata*) | **kuolettava** | Marjakuusi on **tiheäoksainen pensas tai pieni puu** (yleensä alle 10 m, useimmiten alle 5 m), **ei korkea kapea havupuu**. Sen "neulaset" ovat **litteät, pehmeät**, sijoittuvat oksien sivuille **kahteen tasoon (kuten kammasta)**. Marja on **punainen, lihava, kupin muotoinen** (aril). KUUSEN neulaset ovat **4-tahkoisia, teräviä, kovia**, sijoittuvat oksaan **kierreasemaisesti ympäri**. Kuusi on **korkea kapea pyramidimainen havupuu metsässä**. **Kerää vain METSÄSTÄ luonnonvaraisesta korkeasta kuusesta — älä koskaan puutarhasta, hautausmaalta tai koristepensaasta.** Marjakuusi sisältää taksiineja, jotka ovat erittäin myrkyllisiä jo pieninä määrinä — voi aiheuttaa sydänpysähdyksen. |
| Mänty (*Pinus sylvestris*) | matala | Männyn neulaset 4–7 cm pitkät, **parittain** (kaksi yhdessä siteenä). Kuusen neulaset 1–2,5 cm yksittäin. Männyn kerkät ovat myös syötäviä mutta eri makuiset (hartsisempia). |
| Pihta / jalokuusi (*Abies* spp.) | matala | Neulaset litteät, alapinta valkoraitainen, pehmeämmät, mausteinen sitrustuoksu. Kerkät syötäviä myös. Suomessa harvinainen luonnonvaraisena. |

### Lähteet

- **Wikipedia: Metsäkuusi** — https://fi.wikipedia.org/wiki/Metsäkuusi — Wikipedia
- **Wikipedia: Marjakuusi (KRIITTINEN LOOKALIKE)** — https://fi.wikipedia.org/wiki/Marjakuusi — Wikipedia
- **Pinkka virtuaalikasvio** — https://pinkka.helsinki.fi/virtuaalikasvio/ — Helsingin yliopisto
- **Suomen myrkytystietokeskus: marjakuusi (Taxus baccata)** — https://www.myrkytystietokeskus.fi/ — Myrkytystietokeskus (KRIITTINEN)
- **Suomen Luonnonsuojeluliitto** — https://www.sll.fi/ — Suomen Luonnonsuojeluliitto

---

## Yhteenveto reviewiä varten

| # | Kasvi | difficulty | beginnerFriendly | Erityistä huomioitavaa |
|---|---|---|---|---|
| 1 | Nokkonen | easy | true | Polttokarvat, käsineet |
| 2 | Voikukka | easy | true | Sappirakkosairaat |
| 3 | Maitohorsma | easy | true | — |
| 4 | Mesiangervo | easy | true | **Salisylaatti-/aspiriinivaroitus eksplisiittinen** |
| 5 | Poimulehti | easy | true | Tanniinit, raskaus |
| 6 | Piharatamo | easy | true | Saastuneet pihat |
| 7 | Ahomansikka | easy | true | Allergia |
| 8 | Puna-apila | easy | true | Fytoestrogeenit, hormoniherkät |
| 9 | Suolaheinä | easy | true | **Oksaalihappovaroitus eksplisiittinen** |
| 10 | Mustikka | easy | true | Sudenmarja-lookalike (keskitaso), opi tunnistus |
| 11 | Vadelma | easy | true | Alkuraskaus |
| 12 | Kuusenkerkät | easy | **false** | **Marjakuusi-lookalike (kuolettava) → invariantti #6 → ei aloittelijakategoriaan** |

**Avoimet päätökset Rikulle:**

1. Sudenmarja merkitty mustikan keskitaso-lookalikeksi vahvalla `howToDifferentiate`-tekstillä → mustikka pysyy `beginnerFriendly: true`. Konservatiivisempi vaihtoehto: nosta sudenmarja `korkea`-tasoon, jolloin mustikka putoaa aloittelijakategoriasta.
2. Kuusenkerkät: heinäkuussa Etelä-Suomessa kerkät ovat jo loppumassa. Sopiiko silti MVP:hen kesä-painotteisesti, vai siirretäänkö v2:een ja korvataan jollain täysin heinäkuun kasvilla?
3. Lähteiden URL:t: täydennänkö konkreettisina nyt, vai jätetäänkö nimitasolla luonnoksessa ja URL:t lisätään vasta `approved`-vaiheessa?

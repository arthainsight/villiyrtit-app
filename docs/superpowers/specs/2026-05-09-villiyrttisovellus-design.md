# Villiyrttisovellus — design

- **Päivämäärä:** 2026-05-09
- **Tekijät:** Riku Forsell (suunta, sisältöauditointi) + Claude (yhteissuunnittelu, luonnokset)
- **Sisältöreview:** `docs/plant-content-review.md`

---

## 0. Yhteenveto

Suomalainen mobiilisovellus kesä–heinäkuun villiyrttien tunnistamiseen ja käyttöön. MVP-sisältö **12 huolellisesti tarkistettua kasvia**. Offline-first, Android-painotteinen, iOS-yhteensopiva. Visuaalinen tunnelma: rauhallinen, luonnollinen, suomalainen, "metsäkumppani" — ei kliininen botanical database.

**Keskeiset rajaukset:**
- Ei loginia, käyttäjäprofiileja, suosikkeja, sosiaalisia ominaisuuksia, achievementtejä, AI-tunnistusta
- Ei Supabase-riippuvuutta MVP:ssä — pelkkä lokaalidata
- Ei sarjakukkaisia (vuohenputki, koiranputki) — myrkkykeiso-riski liian korkea aloittelijasovellukselle
- Ei UI-snapshot- tai e2e-testejä — testaus keskittyy datan eheyteen

---

## 1. Tavoitteet ja ei-tavoitteet

### MVP-tavoitteet

1. 12 turvallista, helposti tunnistettavaa kesä–heinäkuun kasvia
2. Selkeä mobiili-UX Androidilla, iOS-yhteensopiva
3. Plant Detail -näkymässä turvallisuusinformaatio etusijalla — `safetyNote`, varoitukset, vaaralliset näköislajit
4. Haku ja filterit (kuukausi, vaikeustaso, syötävä, teekasvi, aloittelijaystävällinen)
5. "Mitä luonnosta löytyy juuri nyt" -näkymä etusivulla
6. Toimii offline kokonaan
7. Sisältö-review-prosessi joka estää epätarkan tai puutteellisen datan päätymisen sovellukseen

### Ei MVP-tavoitteita (v2)

- Kataja, vuohenputki, siankärsämö, lisäkasvit (yhteensä ~30)
- Käyttäjätilit, suosikit, kasvilokit, achievementit
- AI-tunnistus kuvasta
- Supabase-pohjainen sisällön päivitys ilman uutta julkaisua
- Sosiaalinen jako, kommentointi, yhteisötietojen syöttö
- Theme override (manuaalinen tumma/vaalea-valinta)
- Useat kieliversiot (englanti, ruotsi)

---

## 2. Stack & arkkitehtuuri

| Päätös | Valinta | Perustelu |
|---|---|---|
| Runtime | **Expo SDK** (uusin vakaa, lukitaan toteutuksen alussa) | Helpoin Android-build, EAS-deploy myöhemmin |
| Kieli | **TypeScript strict** | Plant-tyyppi vahvana läpi koodin; tyyppi johdetaan Zod-schemasta |
| Reititys | **Expo Router** (file-based) | Yksinkertainen, modulaarinen, tukee deep linkejä |
| Tyylit | **NativeWind v4** + `tailwind.config.js` | Tailwind-ajattelu; dark mode `dark:`-luokilla |
| State | **Zustand** (yksi store) | Kevyempi kuin Context, ei boilerplattia. Vain haku/filteri-tila storeen. |
| Theme | **`useColorScheme()`** (RN-natiivi) | Käyttöjärjestelmän asetus; ei storeen. Manuaalinen override v2. |
| Data | **Lokaali `src/data/plants.ts`**, ei verkkoriippuvuutta | Offline-first, ei API-koodia |
| Datavalidointi | **Zod** + `type Plant = z.infer<typeof PlantSchema>` | Plant-tyyppi johdetaan Zod-schemasta |
| Kuvat | **`assets/plants/<id>.webp`** + blurhash | Pakatussa APK:ssa, kevyesti pakattu |
| Kuvakomponentti | **`expo-image`** | Caching, blurhash-placeholderit |
| Animaatiot | **`react-native-reanimated`** v3 | Detail-näkymän hero & collapsibles |
| Ikonit | **`lucide-react-native`** | Yhtenäinen, kevyt |
| Fontit | **Inter** (UI) + **Lora** tai **Fraunces** (otsikot), `@expo-google-fonts/*` | Luonnollinen typografia, suomalainen tunnelma |
| Testit | **Jest** + Zod-validointi | Sisältötiedoston rikkoumat löydetään CI:ssä |

**Ei riippuvuutta:** Supabase, Redux, react-query (ei verkkoa), styled-components.

**Alusta:** Android-prioriteetti UX-säädöissä (touch-koot, takaisin-eleet, haptiikka). iOS toimii samalla koodilla — ei iOS-rikkovia Android-spesifejä komponentteja.

---

## 3. Tiedostorakenne

```
villiyrtit-app/
├─ app/                          # Expo Router — vain reititys + screen-komposointi
│  ├─ _layout.tsx                # Root: theme provider, fonts, store init
│  ├─ index.tsx                  # Home Screen
│  ├─ plants/
│  │  ├─ index.tsx               # Plant List Screen
│  │  └─ [id].tsx                # Plant Detail Screen
│  └─ +not-found.tsx
├─ src/
│  ├─ data/
│  │  ├─ plants.ts               # 12 approved-kasvia, Plant[]
│  │  ├─ plant.schema.ts         # Zod-schema, Plant-tyypin lähde
│  │  └─ categories.ts           # quick categories: aloittelija, syötävä, tee, metsä, piha
│  ├─ components/
│  │  ├─ PlantCard.tsx
│  │  ├─ PlantHero.tsx
│  │  ├─ CollapsibleSection.tsx
│  │  ├─ SearchBar.tsx
│  │  ├─ FilterChips.tsx
│  │  ├─ CategoryRow.tsx
│  │  ├─ DifficultyBadge.tsx
│  │  ├─ BeginnerBadge.tsx
│  │  ├─ DangerCallout.tsx       # safetyNote- ja korkea/kuolettava-lookalike-rendaus
│  │  └─ EmptyState.tsx
│  ├─ store/
│  │  └─ useAppStore.ts          # Zustand: search, filters
│  ├─ hooks/
│  │  └─ usePlants.ts            # filter + haku + currentMonth-derivaatio
│  ├─ lib/
│  │  ├─ months.ts               # FI-kuukaudet, currentMonth
│  │  └─ search.ts               # haku-funktio (case-insensitive, locale-aware)
│  └─ theme/
│     ├─ colors.ts               # light + dark palette
│     └─ typography.ts
├─ assets/
│  ├─ plants/                    # <id>.webp
│  └─ fonts/
├─ docs/
│  ├─ plant-content-review.md    # sisällön review-tiedosto (per-plant reviewStatus)
│  └─ superpowers/specs/2026-05-09-villiyrttisovellus-design.md  # tämä
├─ scripts/
│  ├─ build-plants.ts            # konvertoi review-doc → plants.ts (vain approved); v2
│  └─ fetch-images.ts            # Wikimedia → resize/webp → assets/plants/
├─ tests/
│  ├─ plants.schema.test.ts      # Zod-validointi
│  ├─ plants.invariants.test.ts  # invariantit #2, #4, #7
│  ├─ search.test.ts
│  ├─ filter.test.ts
│  └─ categories.test.ts
├─ tailwind.config.js
├─ babel.config.js
├─ tsconfig.json
├─ app.json
└─ package.json
```

`app/`-kansio pidetään ohuena — vain reititys ja screen-komposointi. Logiikka, komponentit ja data ovat `src/`:ssä, jotta yksikkötestit ja refaktorointi pysyvät puhtaina.

---

## 4. Datamalli — Plant-schema

### Zod-schema (Plant-tyypin lähde)

```ts
// src/data/plant.schema.ts
import { z } from 'zod'

export const Month = z.enum([
  'tammikuu','helmikuu','maaliskuu','huhtikuu','toukokuu','kesäkuu',
  'heinäkuu','elokuu','syyskuu','lokakuu','marraskuu','joulukuu',
])

export const Tag = z.enum([
  'syötävä','teekasvi','mauste','marja','lehti','kukka','juuri','versopuoli',
])

export const DangerLevel = z.enum(['matala','keskitaso','korkea','kuolettava'])
export const Difficulty = z.enum(['easy','medium','hard'])

export const Lookalike = z.object({
  name: z.string().min(1),
  dangerLevel: DangerLevel,
  howToDifferentiate: z.string().min(1),
})

export const Source = z.object({
  title: z.string().min(1),
  url: z.string().url(),
  publisher: z.string().optional(),
})

export const PlantSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  finnishName: z.string().min(1),
  latinName: z.string().min(1),
  shortDescription: z.string().min(1).max(120),
  description: z.string().min(1),

  months: z.array(Month).min(1),
  habitats: z.array(z.string().min(1)).min(1),
  edibleParts: z.array(z.string().min(1)),
  uses: z.array(z.string().min(1)),
  tags: z.array(Tag),

  difficulty: Difficulty,
  beginnerFriendly: z.boolean(),

  // Turvallisuus — aina rendataan näkyvästi
  safetyNote: z.string().min(1),
  warnings: z.array(z.string().min(1)),
  lookalikes: z.array(Lookalike),

  // Kuva
  image: z.string().min(1),                  // 'plants/nokkonen.webp'
  blurhash: z.string().optional(),
  imageCredit: z.string().min(1),
  imageLicense: z.string().min(1),
  imageSourceUrl: z.string().url(),

  // Lähteet auditointia varten
  sources: z.array(Source).min(1),
}).superRefine((plant, ctx) => {
  // Invariantti #5: beginnerFriendly true ⇒ difficulty=easy ja lookalikes ei sisällä korkea/kuolettava
  if (plant.beginnerFriendly) {
    if (plant.difficulty !== 'easy') {
      ctx.addIssue({
        code: 'custom',
        message: `beginnerFriendly=true vaatii difficulty=easy (saatu: ${plant.difficulty})`,
      })
    }
    const dangerous = plant.lookalikes.find(
      l => l.dangerLevel === 'korkea' || l.dangerLevel === 'kuolettava'
    )
    if (dangerous) {
      ctx.addIssue({
        code: 'custom',
        message: `beginnerFriendly=true ei sallittu kun lookalike "${dangerous.name}" on tasoa ${dangerous.dangerLevel}`,
      })
    }
  }
  // Invariantti #6: korkea/kuolettava-lookalike ⇒ howToDifferentiate ei tyhjä JA beginnerFriendly=false
  for (const l of plant.lookalikes) {
    if (l.dangerLevel === 'korkea' || l.dangerLevel === 'kuolettava') {
      if (!l.howToDifferentiate.trim()) {
        ctx.addIssue({
          code: 'custom',
          message: `Lookalike "${l.name}" tasoa ${l.dangerLevel}: howToDifferentiate vaaditaan`,
        })
      }
      if (plant.beginnerFriendly) {
        ctx.addIssue({
          code: 'custom',
          message: `Lookalike "${l.name}" tasoa ${l.dangerLevel}: beginnerFriendly täytyy olla false`,
        })
      }
    }
  }
})

export type Plant = z.infer<typeof PlantSchema>
```

### Invariantit yhteenveto

| # | Invariantti | Validointitapa |
|---|---|---|
| 1 | `safetyNote` ei tyhjä | Zod (`.min(1)`) |
| 2 | Kuvapolku osoittaa olemassa olevaan tiedostoon `assets/plants/`-kansiossa | Jest-testi |
| 3 | `imageCredit`, `imageLicense`, `imageSourceUrl` ei tyhjiä | Zod |
| 4 | `id` uniikki listassa | Jest-testi |
| 5 | `beginnerFriendly === true` ⇒ `difficulty === 'easy'` JA jokainen `lookalike.dangerLevel ∈ {matala, keskitaso}` | Zod superRefine |
| 6 | `lookalike.dangerLevel ∈ {korkea, kuolettava}` ⇒ `howToDifferentiate` ei tyhjä JA `beginnerFriendly === false` | Zod superRefine |
| 7 | `warnings` sisältää lääke-/raskaus-/allergia-/munuais-/oksaalihappo-/salisylaattiriskin ⇒ `safetyNote` mainitsee riskin eksplisiittisesti | Heuristinen Jest-testi (avainsanahaku, varoittaa) + manuaalitarkistus reviewissä |
| 8 | `sources.length >= 1` ja jokaisella validi URL | Zod (`.min(1)`, `z.string().url()`) |
| 9 | **Approval-invariantti:** review-dokumentissa `reviewStatus === 'approved'` vaatii että kasvilla on vähintään 1 sources-entry validilla URL:lla | Build-skripti / manuaalinen review-portti |
| 10 | **Lähdelaatu-invariantti:** approved-kasvilla vähintään 1 non-Wikipedia-lähde. Wikipedia on supplemental — ei riitä yksinään turvallisuuskriittisessä sisällössä. | Jest-testi `tests/plants.invariants.test.ts` (URL-domain-tarkistus) |
| 11 | **Lääketieteellinen-invariantti:** jos `warnings` sisältää lääke-/raskaus-/allergia-/munuais-/myrkytysavainsanan (`'allergi'`, `'raskaud'`, `'imet'`, `'munuais'`, `'aspiriin'`, `'salisylaat'`, `'verenohennu'`, `'NSAID'`, `'diabete'`, `'oksaalihap'`, `'kihti'`, `'fytoestrogeeni'`, `'sappi'`, `'sedatiiv'`, `'hormon'`, `'lääke'`, `'astm'`, `'myrk'`, `'reuma'`, `'tukkeum'`, `'reye'`, `'syövä'`), vähintään 1 source on auktoriteettinen lääketieteellinen tai myrkytyslähde — `laaketietokeskus.fi`, `myrkytystietokeskus.fi`, `thl.fi`, `duodecim.fi`, `helda.helsinki.fi` tai vastaava asiantuntijadomain | Jest-testi (avainsana- + domain-allowlist-tarkistus); pakottava |

### MVP-sisältö: 12 kasvia

Sisältöluonnokset: `docs/plant-content-review.md`. Yhteenveto:

| # | Kasvi | difficulty | beginnerFriendly | Erityishuomio |
|---|---|---|---|---|
| 1 | Nokkonen | easy | true | — |
| 2 | Voikukka | easy | true | — |
| 3 | Maitohorsma | easy | true | — |
| 4 | Mesiangervo | easy | true | Salisylaattivaroitus |
| 5 | Poimulehti | easy | true | — |
| 6 | Piharatamo | easy | true | — |
| 7 | Ahomansikka | easy | true | — |
| 8 | Puna-apila | easy | true | Fytoestrogeenit |
| 9 | Suolaheinä | easy | true | Oksaalihappovaroitus |
| 10 | Mustikka | easy | true | Sudenmarja-lookalike (keskitaso) |
| 11 | Vadelma | easy | true | — |
| 12 | Kuusenkerkät | easy | **false** | Marjakuusi-lookalike (kuolettava); months=[toukokuu, kesäkuu] |

---

## 5. Sisältöprosessi & reviewStatus-logiikka

Sisältö ei mene koskaan suoraan `plants.ts`-tiedostoon. Prosessi:

```
docs/plant-content-review.md (markdown, per-plant reviewStatus)
   ↓ Riku tarkistaa, asettaa reviewStatus
   ↓ (build-skripti tai manuaalinen kopiointi)
   ↓ vain reviewStatus === 'approved' pääsee läpi
src/data/plants.ts (TypeScript Plant[])
   ↓ Zod-validointi runtime + Jest-testissä
   ↓ Build pipeline (Expo)
APK/IPA
```

### reviewStatus-arvot

| Arvo | Merkitys | Konversio plants.ts:ään |
|---|---|---|
| `draft` | Ehdotus, vielä luonnos | Ei |
| `needs_review` | Kirjoittaja pyytää tarkennusta | Ei |
| `approved` | Hyväksytty, sources-URL:t validoitu | **Kyllä** |
| `rejected` | Poistetaan listalta | Ei |

Kaikki kasvit aloittavat `draft`-tilassa. Riku muuttaa `reviewStatus`-arvon kun on lukenut, korjannut ja hyväksynyt sisällön.

### Manuaalinen vs. automatisoitu konversio

**MVP:ssä manuaalinen konversio.** Riku:
1. Lukee `docs/plant-content-review.md`-osion
2. Tekee korjaukset markdownissa
3. Asettaa `reviewStatus: approved`
4. Kopioi kentät käsin `src/data/plants.ts`-tiedostoon
5. Zod-validointi ajetaan testissä — varmistaa että kenttätyypit ja invariantit pitävät

12 kasvin tahdille manuaalinen riittää. Kun lista kasvaa (~20+ v2:ssa), automatisoidaan `scripts/build-plants.ts`-skriptilla joka parsii markdownin, suodattaa approved-kasvit ja generoi `plants.ts`-tiedoston.

### Mitä build-skripti tekee (v2)

1. Lukee `docs/plant-content-review.md` (`unified` + `remark-parse`)
2. Pilkkoo per-plant-osiot (`## N. Name` -otsikot)
3. Parsii kentät rakenteellisesti
4. Suodattaa `reviewStatus === 'approved'` -kasvit
5. Validoi jokaisen `PlantSchema`-Zodilla
6. Tarkistaa approval-invariantit (#9, #10, #11): sources-URL:t valideja, vähintään 1 non-Wikipedia-lähde, lääketieteellisille varoituksille auktoriteettinen lähde (Lääketietokeskus/Myrkytystietokeskus/THL/Duodecim/Helda)
7. Kirjoittaa `src/data/plants.ts`

Skripti ajetaan `pnpm build:plants` -komennolla. CI ajaa sen ennen jokaista buildia.

---

## 6. Navigaatio

Expo Router file-based, kolme näkymää stack-tyyppisesti.

```
index (Home)
  └─ /plants (Plant List)
      └─ /plants/[id] (Plant Detail)
```

### Yksityiskohdat

- **Root layout** (`app/_layout.tsx`) lataa fontit, alustaa Zustand-storen, tarjoaa StatusBar- ja SafeArea-tuet, kytkee currentMonth-derivaation.
- **Stack-navigointi**: header näkyvillä Plant List- ja Detail-näkymissä, takaisin-painike. Home-näkymässä ei headeria — selkeämpi avoin tunnelma.
- **Detail-näkymän takaisin** vie aina edelliseen näkymään (List tai Home riippuen reitistä).
- **Tab navigation** ei käytössä — kolme näkymää eivät vaadi tabbeja, ja stack tuntuu luontaisemmalle "metsäkumppani"-tunnelmalle.
- **Deep linkit** (esim. `villiyrtit://plant/nokkonen`) tuettu Expo Router -muotoiluksi, ei aktiivisesti markkinoida MVP:ssä.

### Header-tyyli

- Ohut, läpikuultavan vaalea/tumma, isompi otsikko (Lora/Fraunces 22–24 px).
- Takaisin-ikoni: `lucide-react-native` `chevron-left`.
- Detail-näkymän header pysyy yksinkertaisena — kasvin nimi pieni tai tyhjä, koska hero-kuvalla on jo iso otsikko.

### Linkit

- Home → Plant List (kategoriaotsikon klikkaus tai "Näytä kaikki")
- Home → Plant Detail (featured-kortin klikkaus, kategorian kortin klikkaus)
- List → Detail (kortin klikkaus)

---

## 7. State management

Yksittäinen Zustand-store: `src/store/useAppStore.ts`.

```ts
type AppState = {
  searchQuery: string
  setSearchQuery: (q: string) => void

  filters: {
    months: Month[]                // valitut kuukaudet, [] = ei rajausta
    difficulty: Difficulty[]       // [] = ei rajausta
    tags: Tag[]                    // [] = ei rajausta
    beginnerFriendlyOnly: boolean
  }
  toggleMonth: (m: Month) => void
  toggleDifficulty: (d: Difficulty) => void
  toggleTag: (t: Tag) => void
  setBeginnerOnly: (v: boolean) => void
  resetFilters: () => void
}
```

### Mitä EI ole storessa

- **Theme**: käytetään `useColorScheme()` (RN-natiivi). Ei manuaalista overridea MVP:ssä.
- **Plants-data**: lokaali import `src/data/plants.ts`, ei storeen.
- **Suosikit, recently viewed, käyttäjäprofiili**: ei MVP:ssä.

### Persistenssi

Filtterit eivät persistoidu MVP:ssä — käyttäjä aloittaa puhtaalta pöydältä joka käynnistyksessä. Jos osoittautuu kiusalliseksi, lisätään AsyncStorage v1.x.

### Hookit

- `useAppStore()` — suora pääsy storeen.
- `usePlants()` — yhdistää `plants.ts`-data + `searchQuery` + `filters` + `currentMonth` → palauttaa filtteröidyn ja lajitellun listan. Palauttaa myös `featured` (currentMonth-osumat, max 6) ja `categories` (kategoriaryhmitellyt listat).

---

## 8. Haku ja filterit

### Haku

- **Algoritmi**: substring match, case-insensitive (`String.prototype.toLocaleLowerCase('fi-FI')` — käsittelee ä/ö oikein).
- **Hakukentät**: `finnishName`, `latinName`, `shortDescription`, `tags`.
- **Debouncing**: 200 ms inputin jälkeen ennen storen päivitystä.
- **Tyhjä query**: kaikki kasvit näytetään (suodatuksen jälkeen).
- **Ei fuzzy-hakua MVP:ssä** — yksinkertainen substring riittää 12 kasville.

### Filterit

Filterit yhdistyvät AND-logiikalla. Tyhjä joukko = ei rajausta.

| Filteri | Arvot | Logiikka |
|---|---|---|
| Kuukaudet | `Month[]` | Kasvi näkyy jos `plant.months ∩ filters.months ≠ ∅` |
| Vaikeustaso | `Difficulty[]` | Kasvi näkyy jos `plant.difficulty ∈ filters.difficulty` |
| Tagit | `Tag[]` | Kasvi näkyy jos `plant.tags ⊇ filters.tags` (kaikki valitut tagit löytyvät) |
| Aloittelijaystävällinen | `boolean` | Jos `true`: vain `plant.beginnerFriendly === true` |

### UI

- **Search bar**: pysyy aina yläosassa (Home ja List), kiinteänä.
- **Filter chips**: List-näkymässä Search barin alla, vaakatason scroll. Aktiiviset filterit korostettu väritaustalla.
- **"Tyhjennä filterit"** -nappi näkyy vain kun yksikin filteri on aktiivisina.
- **Empty state**: jos haku/filterit eivät tuota osumia → `EmptyState`-komponentti: ikoni + viesti "Ei tuloksia näillä ehdoilla" + "Tyhjennä filterit" -nappi.

### Featured plants Home-näkymässä

- **Predicate**: `plant.months.includes(currentMonth)`
- **Lajittelu**: `beginnerFriendly desc`, sitten `difficulty asc` (easy→hard), sitten `finnishName asc`
- **Cap**: max 6 korttia horisontaalisessa scrollissa
- **Otsikko**: "Mitä luonnosta löytyy {currentMonthCapitalized}ssa?"

### Quick categories Home-näkymässä

Jokainen kategoria on horisontaalinen scroll PlantCard-korteilla.

| Kategoria | Predicate |
|---|---|
| Helppo aloittelijalle | `plant.beginnerFriendly === true` |
| Syötävät | `plant.tags.includes('syötävä')` tai `plant.edibleParts.length > 0` |
| Teekasvit | `plant.tags.includes('teekasvi')` |
| Metsä | `plant.habitats.some(h => h.includes('metsä'))` |
| Piha | `plant.habitats.some(h => h.includes('piha') \|\| h.includes('niitty') \|\| h.includes('pelto'))` |

Jos kategoria on tyhjä, riviä ei näytetä.

---

## 9. Tyyli, typografia & dark mode

### Filosofia

Rauhallinen, luonnollinen, suomalainen, minimalistinen. Tavoitemielikuva: "metsäkumppani luonnossa" — ei kliininen botanical database. Käyttäjän pitää tuntea olonsa rentoutuneeksi, ei kuormittuneeksi tietomäärästä.

### Värimaailma

**Light mode** (lähtökohta):
- Tausta: `#FAF8F5` (lämmin valkoinen, hieman kerma)
- Pinta (kortit): `#FFFFFF`
- Pääväri: `#4A6741` (sammaltunut metsänvihreä)
- Aksentti: `#A87344` (metsäruskea, kuoren ja sienen sävy)
- Teksti: `#1F2419` (lähes musta, hieman vihertävä)
- Vaaleat tekstit: `#5A6151`

**Dark mode**:
- Tausta: `#0F1410`
- Pinta: `#1A1F1A`
- Pääväri: `#9CB89A` (vaaleampi sammalvihreä)
- Aksentti: `#C49870`
- Teksti: `#E8E5DD`
- Vaaleat tekstit: `#9CA092`

**Varoitusvärit** (samat molemmissa):
- Korkea-/kuolettava-varoitus: `#C8341B` (perinteinen suomalainen punainen, ei häikäisevä)
- Yleinen huomio: `#D4A012` (kullankeltainen)

### Typografia

| Käyttötarkoitus | Fontti | Koko |
|---|---|---|
| Kasvin nimi (detail-hero) | Lora bold | 32 px |
| Näkymäotsikko (H1) | Lora regular | 24 px |
| Kategoriat, sektio-otsikot (H2) | Inter semibold | 18 px |
| Leipäteksti | Inter regular | 16 px |
| Pieni teksti | Inter regular | 14 px |
| Caption (kuvalisenssi) | Inter regular, vaalennettuna | 12 px |

Rivivälit: 1.5 leipätekstissä, 1.3 otsikoissa.

### Komponenttitasoiset valinnat

- **Kortit**: pyöristys `border-radius: 16px`, varjo light-modessa (`shadow-sm`), reuna dark-modessa (`border border-zinc-800`).
- **Painikkeet**: täytetty (`bg-primary text-on-primary`) tai tekstinappi (`text-primary`). Reunat 12 px.
- **Touch targetit**: vähintään 48×48 px (Material-ohje, Android-prioriteetti).
- **Whitespace**: gap-arvot 8/16/24/32 — generous, ei tiivis.
- **Kuvat**: aina `expo-image` blurhash-placeholderilla, aspect-ratio 4:3 listakorteissa, 16:9 hero-kuvissa.

### Dark mode

NativeWind v4 tukee automaattisesti `dark:`-prefiksiä. Tunnistus `useColorScheme()`:llä, joka heijastaa OS-asetuksen reaaliajassa.

Värit määritellään `tailwind.config.js`:n custom-paletissa (`bg-canvas`, `bg-surface`, `text-primary`, jne.) jotta vaihto on yksinkertaista. Jokainen komponentti määrittää `bg-canvas dark:bg-canvas-dark` -tyyppiset parit.

### Animaatiot (vain syyn kanssa)

- Detail-näkymän hero-kuvan parallax-scroll
- Collapsible-sektiot (warnings, lookalikes) — Reanimated layout-animation
- Kortin painalluksen feedback (`scale: 0.98`)
- **Ei spinneriä lataamiseen** — datat ovat heti käytettävissä, ei verkkoa

### Plant Detail -näkymän rakenne (turvallisuus etusijalla)

Järjestys ylhäältä alas:

1. Hero-kuva (16:9) + kasvin nimi (Lora 32 px) + latinankielinen nimi (Inter 14 px italic)
2. **`DangerCallout` — `safetyNote`** (heti hero-kuvan jälkeen, korostettu laatikko)
3. Difficulty- ja BeginnerFriendly-merkit
4. Kuukaudet-rivi (chip-tyyliin)
5. Lyhyt kuvaus (Inter 16 px)
6. Collapsible: Tunnistus
7. Collapsible: Syötävät osat
8. Collapsible: Käyttötavat
9. Collapsible: **Varoitukset** (oletuksena auki jos `warnings.length > 0`)
10. Collapsible: **Vaaralliset näköislajit** (oletuksena auki jos `lookalikes.some(l => l.dangerLevel ∈ {korkea, kuolettava})`)
11. Habitats
12. Kuvalisenssi (Inter 12 px caption)
13. Lähteet (linkkilista, ei MVP:ssä; sources-data on dataa varten)

Korkea/kuolettava-tason lookalike rendaa punaisella reunalla, varoitusikonilla ja `howToDifferentiate`-tekstillä pakollisena näkyvillä.

---

## 10. Virhetilat & edge cases

| Tilanne | Käyttäytyminen |
|---|---|
| Kuvatiedosto puuttuu (asset bundle rikki) | `expo-image` näyttää blurhashin tai tyhjän pohjan; hiljainen virhe — ei kaada näkymää |
| Plant ID:tä ei löydy detail-reitissä (`/plants/foo`) | `+not-found.tsx` ohjaa List-näkymään; pieni toast "Kasvia ei löytynyt" |
| Hakuosumia ei tule | `EmptyState`-komponentti: kuvitus + viesti + "Tyhjennä filterit" -nappi |
| Filterit yhdessä eivät tuota osumia | Sama kuin yllä |
| `currentMonth` ei tuota featured-osumia | Home-näkymä: "Tällä kuukaudella ei ole listallamme kasveja — tutustu kuitenkin koko valikoimaan" + linkki List-näkymään |
| Schema-validointivirhe `plants.ts`:ssä | **Build kaatuu** — Jest-testi epäonnistuu. Datatiedosto ei pääse julkaisuun rikottuna. |
| `imageSourceUrl` viittaa kuolleeseen URL:iin | UI-vaikutus nolla (URL on metadataa). Lisäys `tests/sources.test.ts`:hen myöhemmin: ajaa HEAD-requestit, varoittaa CI:ssä. v2. |
| Käyttäjä ei suomenkielisellä OS:llä | Sovellus on vain suomenkielinen MVP:ssä. Ei lokalisointia. v2 jos tarpeen. |
| Vanhentunut Expo SDK | `package.json` lukitsee SDK-version. Päivityksissä testataan kaikki näkymät. |
| Käyttäjä yrittää syöttää erikoismerkkejä hakuun | `toLocaleLowerCase('fi-FI')` käsittelee ä/ö, muut erikoismerkit tulkitaan substring-sääntöjen mukaan |
| Pieni näyttö (ehkä 4.5") | Min-leveys 360 px; flex-layoutit toimivat. Testataan emulaattorissa. |

---

## 11. Testaus

### Lähestymistapa

MVP:ssä **ei UI-snapshot- tai e2e-testejä**. Testaus keskittyy datan oikeellisuuteen, koska sisältövirhe on käyttäjälle vaarallinen, kun taas UI-bugi on vain kiusallinen. UI-testaus tulee v2:ssa Detoxilla tai Maestrolla, kun näkymät ovat vakautuneet.

### Testit

**`tests/plants.schema.test.ts`** — käy `plants.ts`-arrayn läpi, ajaa `PlantSchema.parse()` jokaiselle. Yksi `it()` per kasvi, jotta epäonnistunut testi näyttää suoraan mikä kasvi rikkoo.

**`tests/plants.invariants.test.ts`** — testaa invariantit jotka eivät mene Zodin superRefiniin:
- **Invariantti #2:** jokaisen `image`-polun tiedosto on olemassa `assets/plants/`-kansiossa.
- **Invariantti #4:** `id`:t uniikkeja.
- **Invariantti #7 (heuristinen, varoitus):** jos `warnings.join(' ')` sisältää avainsanan listalta `['allergi', 'raskaud', 'imet', 'munuais', 'aspiriin', 'salisylaat', 'verenohennu', 'NSAID', 'diabete', 'oksaalihap', 'kihti', 'fytoestrogeeni', 'sappi', 'sedatiiv', 'hormon', 'lääke', 'astm', 'myrk', 'reuma', 'tukkeum', 'reye', 'syövä']`, niin `safetyNote.toLowerCase()` mainitsee saman tai liittyvän termin. **Varoitus, ei pakottava** — testi merkitsee kasvin "needs review", ei kaada buildia.
- **Invariantti #10 (pakottava):** jokaisella `plants.ts`-kasvilla `sources.some(s => !s.url.includes('wikipedia.org'))`. Wikipedia-only-kasvit kaadetaan.
- **Invariantti #11 (pakottava):** jos `warnings`-merkkijono sisältää saman avainsanan kuin #7, niin `sources.some(s => trustedMedicalDomains.some(d => s.url.includes(d)))`, missä `trustedMedicalDomains = ['laaketietokeskus.fi','myrkytystietokeskus.fi','thl.fi','duodecim.fi','helda.helsinki.fi']`. Lista laajennettavissa tarvittaessa.

**`tests/search.test.ts`** — `search()`-funktion yksikkötestit: case-insensitive haku, suomalaiset merkit (ä,ö), substring-haku, tyhjä query, useita kenttiä.

**`tests/filter.test.ts`** — `filterPlants()`-funktion yksikkötestit: AND-logiikka, tyhjät filterit = ei rajausta, kuukausi+vaikeustaso+tag-yhdistelmät.

**`tests/categories.test.ts`** — quick categories -predikaatit: jokainen kategoria palauttaa odotetut kasvit testidatasta.

### CI

GitHub Actions (lisätään julkaisuvalmistelussa):

1. `pnpm install`
2. `pnpm test` (Jest)
3. `pnpm typecheck` (`tsc --noEmit`)
4. `pnpm lint` (ESLint)
5. (myöhemmin) `pnpm build:plants` ja varmistaa että `plants.ts` on synkassa review-dokumentin kanssa

---

## 12. Build pipeline & julkaisu

### Lokaali kehitys

- `pnpm install`
- `pnpm start` tai `npx expo start` — Metro-bundler + QR-koodi
- Android-emulaattori tai fyysinen laite. Expo Go aluksi, dev build kun natiivit kirjastot vaativat.

### Julkaisu (ei MVP:n osa)

- EAS Build (Expo Application Services) Android APK:ksi
- Sisäinen jakelu APK:na ennen Play Storea
- Play Store julkaisu v1.x

### Sisältöpäivitys

MVP:ssä uusi sisältö = uusi APK-versio. Tämä on tietoinen valinta — kun lähdedata on lokaalisti pakattuna, päivitys vaatii buildia. 12 kasvin tahdille riittää.

V2: Supabase + lokaali cache mahdollistaa kasvin lisäyksen ilman uutta julkaisua.

### Kuvien valmistelu (`scripts/fetch-images.ts`)

1. Lue `plants.ts` (tai review-doc): `imageSourceUrl` per kasvi
2. Lataa Wikimedia-originaali väliaikaisesti
3. Resize 1200×800 max (säilytä aspect ratio)
4. Konvertoi WebP, laatu 80
5. Tallenna `assets/plants/<id>.webp`
6. Generoi blurhash-arvo, päivitä `plants.ts`-tiedoston `blurhash`-kenttä

Skripti ajetaan käsin (`pnpm fetch:images`) sisällön päivityksen yhteydessä, ei buildaus-pipelinessä.

---

## 13. Roadmap v2 (ei MVP:ssä)

| Ominaisuus | Perustelu lykkäykselle |
|---|---|
| Sarjakukkaiset (vuohenputki, koiranputki) + opetussisältö myrkkykeisosta | Tarvitsee oma "vaaralliset näköislajit" -opetusosio ja tarkempi tunnistuslogiikka |
| Siankärsämö (medium-vaikeustaso) | Ei aloittelijaystävällinen, vaatii medium-difficulty-näkymät |
| Kataja, lisää 15+ kasvia (yhteensä ~30) | MVP keskittyy 12:n laatuun |
| Suosikit, kasviloki, "kerätyt"-merkinnät | Vaatii AsyncStorage-persistenssin ja oman näkymän |
| AI-tunnistus kuvasta | Suuri scope, vaatii ML-mallin tai OpenAI Vision -integraation |
| Supabase + offline cache | Mahdollistaa sisällön päivityksen ilman julkaisua |
| Theme override (manuaalinen tumma/vaalea) | Pieni vaiva, mutta v1:ssä ei tarpeen |
| iOS-testaus ja TestFlight | Kohderyhmä Android-painotteinen aluksi |
| Useita kieliversioita (englanti, ruotsi) | Suomi riittää MVP:lle |
| Kommentointi, jako, yhteisösisältö | Päinvastainen "metsäkumppani"-tunnelmalle MVP:ssä |
| Achievementit, retkimerkinnät | Pelillistys voi tulla myöhemmin, jos käyttäjäkunta sitä haluaa |
| Build-skripti `scripts/build-plants.ts` (markdown → plants.ts) | Manuaalinen kopiointi riittää 12 kasville |
| Lähteiden URL-verifointi CI:ssä | Heuristinen test myöhemmin, ei MVP:n estävä tekijä |

---

## Liitteet

- `docs/plant-content-review.md` — 12 kasvin sisältöluonnokset reviewiä varten, kukin `reviewStatus: draft`
- `tailwind.config.js` (toteutuksessa) — värit ja typografia
- `src/data/plant.schema.ts` (toteutuksessa) — Zod-schema yllä

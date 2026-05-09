import type { Plant } from '@/data/plant.schema'
import { PlantSchema } from '@/data/plant.schema'

// DEVELOPMENT FIXTURES — placeholder plants used only to drive UI work in Section 5+.
// These are NOT real plant content. Task 26 will replace the runtime plants array
// (in src/data/plants.ts) with content from docs/plant-content-review.md
// once Riku has set reviewStatus: approved on each.
//
// Each fixture passes ALL invariants (#1-#11) so the existing test suite
// keeps passing once src/data/plants.ts re-exports this array.

const raw: Plant[] = [
  {
    id: 'fixture-nokkonen',
    finnishName: 'Nokkonen (kehitysfixture)',
    latinName: 'Urtica dioica',
    shortDescription: 'Polttava lehti, ravintorikas — kuumenna ennen syöntiä.',
    description: 'Pystykasvuinen ruohovartinen monivuotinen, vastakkaiset sahalaitaiset lehdet, polttokarvat. Yleinen ravinteikkaalla maalla. Korvataan oikealla sisällöllä Task 26:ssa.',
    months: ['toukokuu','kesäkuu','heinäkuu','elokuu','syyskuu'],
    habitats: ['ravinteinen multainen maa','pihat','pellonpiennat'],
    edibleParts: ['nuoret versot','nuoret lehdet'],
    uses: ['keitto','smoothie','tee'],
    tags: ['syötävä','lehti','teekasvi'],
    difficulty: 'easy',
    beginnerFriendly: true,
    safetyNote: 'Käytä käsineitä keräillessä — polttokarvat kirvelevät. Munuaissairaat: konsultoi lääkäriä.',
    warnings: [
      'Polttokarvat: käytä käsineitä',
      'Munuaissairaus, diureettilääkitys: konsultoi lääkäriä',
    ],
    lookalikes: [
      { name: 'Valkopeippi (Lamium album)', dangerLevel: 'matala', howToDifferentiate: 'Ei polttokarvoja, valkoiset huulikukat.' },
    ],
    image: 'plants/fixture-nokkonen.webp',
    imageCredit: 'Placeholder — korvataan',
    imageLicense: 'CC BY-SA 4.0',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:placeholder.jpg',
    sources: [
      { title: 'Pinkka virtuaalikasvio', url: 'https://pinkka.helsinki.fi/virtuaalikasvio/', publisher: 'Helsingin yliopisto' },
      { title: 'Lääketietokeskus', url: 'https://www.laaketietokeskus.fi/', publisher: 'Lääketietokeskus' },
    ],
  },
  {
    id: 'fixture-maitohorsma',
    finnishName: 'Maitohorsma (kehitysfixture)',
    latinName: 'Chamaenerion angustifolium',
    shortDescription: 'Vaaleanpunaiset terttukukat heinäkuussa, pajunmaiset lehdet.',
    description: 'Korkea pystykasvuinen kasvi paloalueilla ja hakkuuaukioilla. Korvataan oikealla sisällöllä Task 26:ssa.',
    months: ['kesäkuu','heinäkuu','elokuu'],
    habitats: ['paloalueet','hakkuuaukiot','metsänreunat'],
    edibleParts: ['nuoret versot','lehdet','kukat'],
    uses: ['parsa','tee','salaatti'],
    tags: ['syötävä','teekasvi','kukka'],
    difficulty: 'easy',
    beginnerFriendly: true,
    safetyNote: 'Helposti tunnistettava kukinnan aikana. Vältä saastuneilta paloalueilta.',
    warnings: [],
    lookalikes: [],
    image: 'plants/fixture-maitohorsma.webp',
    imageCredit: 'Placeholder — korvataan',
    imageLicense: 'CC BY-SA 4.0',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:placeholder.jpg',
    sources: [
      { title: 'Pinkka virtuaalikasvio', url: 'https://pinkka.helsinki.fi/virtuaalikasvio/', publisher: 'Helsingin yliopisto' },
    ],
  },
  {
    id: 'fixture-kuusenkerkat',
    finnishName: 'Kuusenkerkät (kehitysfixture)',
    latinName: 'Picea abies',
    shortDescription: 'Vaaleanvihreät uudet kasvut alkukesän aikana.',
    description: 'Kerkät tuoreita touko-kesäkuussa. Marjakuusen sekoittaminen vaarallista. Korvataan oikealla sisällöllä Task 26:ssa.',
    months: ['toukokuu','kesäkuu'],
    habitats: ['havumetsät','metsänreunat'],
    edibleParts: ['kerkät'],
    uses: ['siirappi','tee','salaatti'],
    tags: ['mauste','versopuoli'],
    difficulty: 'easy',
    beginnerFriendly: false,
    safetyNote: 'Varmista että kasvi on KUUSI, ei marjakuusi (Taxus baccata, ERITTÄIN myrkyllinen). Kerää vain metsän luonnonvaraisesta korkeasta kuusesta, ei puutarhasta.',
    warnings: [
      'Marjakuusi-vaara: kerää vain metsästä, ei puutarhasta',
      'Suuret määrät: terpeenit voivat ärsyttää vatsaa',
    ],
    lookalikes: [
      {
        name: 'Marjakuusi (Taxus baccata)',
        dangerLevel: 'kuolettava',
        howToDifferentiate: 'Marjakuusi on tiheäoksainen pensas tai pieni puu (alle 10 m), litteät pehmeät neulaset kahteen tasoon, punainen lihava marja. Kuusi on korkea kapea havupuu metsässä, neulaset 4-tahkoisia ja teräviä, kierreasemaisesti oksassa.',
      },
    ],
    image: 'plants/fixture-kuusenkerkat.webp',
    imageCredit: 'Placeholder — korvataan',
    imageLicense: 'CC BY-SA 4.0',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:placeholder.jpg',
    sources: [
      { title: 'Pinkka virtuaalikasvio', url: 'https://pinkka.helsinki.fi/virtuaalikasvio/', publisher: 'Helsingin yliopisto' },
      { title: 'Suomen myrkytystietokeskus', url: 'https://www.myrkytystietokeskus.fi/', publisher: 'Myrkytystietokeskus' },
    ],
  },
]

// Validate at module load: if any fixture violates an invariant, throw immediately.
// This is dev-only — same Zod that runtime uses.
export const devFixturePlants: Plant[] = raw.map((p) => PlantSchema.parse(p))

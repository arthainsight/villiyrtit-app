import { PlantSchema, type Plant } from '@/data/plant.schema'

// Task 26 dev seed — seitsemän yleistä suomalaista villiyrttiä/marjaa, jotka kattavat:
// - eri difficulty-tasoja (easy/medium/hard)
// - beginnerFriendly true/false
// - eri kuukausia ja habitaatteja
// - kaikki tag-arvot
// - ainakin yksi kuolettava lookalike (kuusenkerkkä → marjakuusi)
// - ainakin yksi kasvi ilman lookalikeja (maitohorsma)
// - ainakin yksi kasvi usealla habitatilla (voikukka, puolukka)
//
// Kuvat ovat dev-placeholdereita: 3 olemassa olevaa webp:iä jaettuna 7 kasvilla.
// Korvataan oikeilla kuvilla ennen tuotantojulkaisua.
//
// Lääketieteelliset varoitukset (raskaus, lääkkeet, allergia, sappi, verenohennus)
// vaativat luotettavan lähteen (laaketietokeskus / myrkytystietokeskus / duodecim).

const raw: Plant[] = [
  {
    id: 'nokkonen',
    finnishName: 'Nokkonen',
    latinName: 'Urtica dioica',
    shortDescription: 'Polttava ravintorikas lehti, kuumenna ennen syöntiä.',
    description:
      'Pystykasvuinen monivuotinen ruohovartinen kasvi, jolla on vastakkaiset, sahalaitaiset lehdet ja koko pintaa peittävät polttokarvat. Kasvaa runsaslukuisesti typpipitoisilla pihapiireissä, pellonpientareilla ja talojen seinustoilla. Nuoret versot ja lehdet ovat erinomaista ihmisruokaa keväällä — valkuaista, rautaa, C-vitamiinia. Polttokarvat tuhoutuvat kuumennettaessa tai ryöpätessä.',
    months: ['toukokuu', 'kesäkuu', 'heinäkuu', 'elokuu', 'syyskuu'],
    habitats: ['ravinteinen multainen maa', 'pihat', 'pellonpiennat'],
    edibleParts: ['nuoret versot', 'nuoret lehdet'],
    uses: ['keitto', 'pesto', 'smoothie', 'tee', 'kuivattuna mausteena'],
    tags: ['syötävä', 'lehti', 'teekasvi'],
    difficulty: 'easy',
    beginnerFriendly: true,
    safetyNote:
      'Käytä käsineitä keräillessä — polttokarvat aiheuttavat kirvelyä iholla. Kuumenna tai ryöppää aina ennen syöntiä. Munuaissairaat ja diureettilääkitystä käyttävät: konsultoi lääkäriä, kasvi voimistaa virtsaneritystä.',
    warnings: [
      'Polttokarvat: käytä käsineitä keruussa',
      'Munuaissairaus tai diureettilääkitys: konsultoi lääkäriä ennen säännöllistä käyttöä',
    ],
    lookalikes: [
      {
        name: 'Valkopeippi (Lamium album)',
        dangerLevel: 'matala',
        howToDifferentiate:
          'Valkopeippi muistuttaa nokkosen lehteä, mutta siltä puuttuvat polttokarvat ja se kukkii valkoisin huulikukin. Hipaisutesti riittää: jos ei polta, se on peippi.',
      },
    ],
    image: 'plants/fixture-nokkonen.webp',
    imageCredit: 'Dev-placeholder — korvataan oikealla kuvalla',
    imageLicense: 'CC BY-SA 4.0',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Urtica_dioica_placeholder.jpg',
    sources: [
      {
        title: 'Pinkka virtuaalikasvio: Urtica dioica',
        url: 'https://pinkka.helsinki.fi/virtuaalikasvio/',
        publisher: 'Helsingin yliopisto',
      },
      {
        title: 'Lääketietokeskus: nokkosen yhteisvaikutukset',
        url: 'https://www.laaketietokeskus.fi/',
        publisher: 'Lääketietokeskus',
      },
    ],
  },

  {
    id: 'kuusenkerkka',
    finnishName: 'Kuusenkerkkä',
    latinName: 'Picea abies',
    shortDescription: 'Tuoreet vaaleanvihreät kuusen versot alkukesällä.',
    description:
      'Kuusen uusien vuosikasvujen vaaleanvihreät kärjet, joita kerätään touko–kesäkuussa kun ne ovat vielä pehmeitä. Sitruksisia, hartsisen tuoksuisia. Sopivat siirappiin, teehen, etikoihin ja salaatteihin. Kerää aina luonnonvaraisesta korkeasta metsäkuusesta — koristepuutarhojen "kuusi" voi todellisuudessa olla marjakuusi, joka on äärimmäisen myrkyllinen.',
    months: ['toukokuu', 'kesäkuu'],
    habitats: ['havumetsät', 'metsänreunat'],
    edibleParts: ['kerkät'],
    uses: ['siirappi', 'tee', 'salaatti', 'etikat', 'tuore mauste'],
    tags: ['mauste', 'versopuoli'],
    difficulty: 'medium',
    beginnerFriendly: false,
    safetyNote:
      'VARMISTA aina kasvi: oikeilta kuusilta saa kerätä — marjakuusi (Taxus) on kuolettavan myrkyllinen. Älä kerää koristepuutarhoista. Suuret määrät terpeenejä voivat ärsyttää vatsaa ja munuaisia, vältä raskauden aikana.',
    warnings: [
      'Marjakuusi-vaara: kerää vain luonnonvaraisesta metsäkuusesta, ei puutarhoista',
      'Suuret määrät: terpeenit voivat ärsyttää vatsaa ja munuaisia',
      'Raskauden aikana: vältä säännöllistä käyttöä',
    ],
    lookalikes: [
      {
        name: 'Marjakuusi (Taxus baccata)',
        dangerLevel: 'kuolettava',
        howToDifferentiate:
          'Marjakuusi on tiheäoksainen pensas tai pieni puu (alle 10 m), neulaset litteät ja pehmeät, järjestyneet kahteen tasoon, marjat punaisia ja lihavia. Kuusi on korkea kapea havupuu (15–40 m), neulaset 4-tahkoisia ja teräviä, kierreasemaisesti oksassa, käpyjen riipparyhmittyjä. Älä kerää KOSKAAN puutarhasta tai pihalta — luonnonmetsässä Suomen luonnossa on lähes aina kuusi, mutta varmista aina koko puun habitus.',
      },
    ],
    image: 'plants/fixture-kuusenkerkat.webp',
    imageCredit: 'Dev-placeholder — korvataan oikealla kuvalla',
    imageLicense: 'CC BY-SA 4.0',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Picea_abies_placeholder.jpg',
    sources: [
      {
        title: 'Pinkka virtuaalikasvio: Picea abies',
        url: 'https://pinkka.helsinki.fi/virtuaalikasvio/',
        publisher: 'Helsingin yliopisto',
      },
      {
        title: 'Myrkytystietokeskus: marjakuusi',
        url: 'https://www.myrkytystietokeskus.fi/',
        publisher: 'HUS Myrkytystietokeskus',
      },
    ],
  },

  {
    id: 'voikukka',
    finnishName: 'Voikukka',
    latinName: 'Taraxacum officinale',
    shortDescription: 'Keltaiset kukat, sahalaitaiset lehdet pihoilla ja niityillä.',
    description:
      'Pihaan, nurmikkoon, niitylle ja tienvarsille leviävä monivuotinen rikkakasvi, jonka jokainen osa on hyödyllinen. Lehdet keväällä salaattiin, kukat siirappeihin ja viineihin, juuret paahdettuina kahvinkorvike. Maitiaisneste haaltuu vedessä. Erityisen runsaasti A- ja K-vitamiinia.',
    months: ['huhtikuu', 'toukokuu', 'kesäkuu'],
    habitats: ['pihat', 'niityt', 'tienvarret', 'joutomaat'],
    edibleParts: ['nuoret lehdet', 'kukinto', 'juuri'],
    uses: ['salaatti', 'siirappi', 'viini', 'paahdettu juuri kahvinkorvikkeena'],
    tags: ['syötävä', 'lehti', 'kukka', 'juuri'],
    difficulty: 'easy',
    beginnerFriendly: true,
    safetyNote:
      'Sappitukkeumassa, sappikivien yhteydessä ja virtsatietukkeumissa: vältä — kasvi lisää nesteenlähtöä. Diureetti- ja diabeteslääkitys: keskustele lääkärin kanssa yhteisvaikutuksista. Kerää saastumattomilta alueilta, ei tienvarsilta vilkasliikenteisiltä teiltä.',
    warnings: [
      'Sappitukkeuma tai sappikivet: vältä — voimistaa nesteenlähtöä',
      'Diureetti- ja diabeteslääkitys: konsultoi lääkäriä yhteisvaikutusten vuoksi',
      'Vilkasliikenteisten teiden varret: vältä keruuta saastuneilla alueilla',
    ],
    lookalikes: [
      {
        name: 'Keltano (Hieracium spp.)',
        dangerLevel: 'matala',
        howToDifferentiate:
          'Keltanon varsi on haarainen ja siinä on useampi pieni keltainen mykerö, voikukan varsi on yksittäinen ontto kukkavarsi yhden mykerön kanssa. Maku ei ole vaarallinen.',
      },
    ],
    image: 'plants/fixture-maitohorsma.webp',
    imageCredit: 'Dev-placeholder — korvataan oikealla kuvalla',
    imageLicense: 'CC BY-SA 4.0',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Taraxacum_placeholder.jpg',
    sources: [
      {
        title: 'Pinkka virtuaalikasvio: Taraxacum officinale',
        url: 'https://pinkka.helsinki.fi/virtuaalikasvio/',
        publisher: 'Helsingin yliopisto',
      },
      {
        title: 'Lääketietokeskus: voikukan yhteisvaikutukset',
        url: 'https://www.laaketietokeskus.fi/',
        publisher: 'Lääketietokeskus',
      },
    ],
  },

  {
    id: 'maitohorsma',
    finnishName: 'Maitohorsma',
    latinName: 'Chamaenerion angustifolium',
    shortDescription: 'Vaaleanpunaiset terttukukat heinäkuussa, pajunmaiset lehdet.',
    description:
      'Korkea pystykasvuinen monivuotinen kasvi, joka levittäytyy hakkuuaukioille, paloalueille ja metsänreunoihin. Tunnistettavissa pitkän kapeista pajunmaisista lehdistä ja näyttävistä vaaleanpunaisista pystytertuista heinäkuussa. Nuoret versot toimivat parsana, lehdet käyvät teehen ja kukat kuvioivat salaatteja. Ivan-tšaita käymisen jälkeen.',
    months: ['kesäkuu', 'heinäkuu', 'elokuu'],
    habitats: ['paloalueet', 'hakkuuaukiot', 'metsänreunat'],
    edibleParts: ['nuoret versot', 'lehdet', 'kukat'],
    uses: ['parsa', 'tee', 'salaatti', 'fermentoitu Ivan-tšai'],
    tags: ['syötävä', 'teekasvi', 'kukka'],
    difficulty: 'easy',
    beginnerFriendly: true,
    safetyNote:
      'Helposti tunnistettava kukinnan aikana — ei tunnettuja vaarallisia näköislajeja. Vältä saastuneilta paloalueilta (esim. ratapenkat, kemikaaliroiskeet). Kohtuukäyttö suositeltavaa.',
    warnings: [],
    lookalikes: [],
    image: 'plants/fixture-maitohorsma.webp',
    imageCredit: 'Dev-placeholder — korvataan oikealla kuvalla',
    imageLicense: 'CC BY-SA 4.0',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Chamaenerion_placeholder.jpg',
    sources: [
      {
        title: 'Pinkka virtuaalikasvio: Chamaenerion angustifolium',
        url: 'https://pinkka.helsinki.fi/virtuaalikasvio/',
        publisher: 'Helsingin yliopisto',
      },
    ],
  },

  {
    id: 'siankarsamo',
    finnishName: 'Siankärsämö',
    latinName: 'Achillea millefolium',
    shortDescription: 'Pieni valkokukka ja höyhenmäisesti jaetut lehdet niityillä.',
    description:
      'Monivuotinen kärsämökasvi, jonka tunnistaa höyhenmäisesti hyvin tiheästi jakautuneista lehdistä ja pienistä valkoisista (joskus vaaleanpunertavista) huiskumaisista mykeröistä. Klassinen rohdoskasvi — käytetty ulkoisesti haavoihin, sisäisesti teenä. Sisältää useita vaikuttavia aineita, joten yhteisvaikutuksia kannattaa kunnioittaa.',
    months: ['kesäkuu', 'heinäkuu', 'elokuu', 'syyskuu'],
    habitats: ['niityt', 'tienvarret', 'pellonpiennat', 'joutomaat'],
    edibleParts: ['nuoret lehdet', 'kukat'],
    uses: ['tee', 'mauste', 'tinktuura', 'haavanhoitokääre'],
    tags: ['teekasvi', 'mauste', 'lehti'],
    difficulty: 'hard',
    beginnerFriendly: false,
    safetyNote:
      'Raskauden aikana vältä — voi vaikuttaa kohdun supistuksiin. Asterikasviallergia (Asteraceae): voi laukaista ihoärsytystä ja allergiaoireita. Verenohennuslääkitys (esim. varfariini): konsultoi lääkäriä ennen säännöllistä käyttöä, kasvi voi voimistaa veren hyytymisen estoa. Säännöllinen pitkäaikainen käyttö ei suositeltavaa.',
    warnings: [
      'Raskauden aikana vältä — vaikutus kohdun supistuksiin',
      'Asterikasviallergia: voi laukaista ihoärsytystä ja allergiaoireita',
      'Verenohennuslääkitys (varfariini, NSAID): konsultoi lääkäriä yhteisvaikutuksista',
    ],
    lookalikes: [
      {
        name: 'Karvakärsämö (Achillea ptarmica)',
        dangerLevel: 'matala',
        howToDifferentiate:
          'Karvakärsämön lehdet ovat eheäreunaisia ja kapeita, eivät höyhenmäisesti jaettuja. Mykerö on suurempi ja yksittäinen. Käyttö pienissä määrin samankaltainen, ei vaarallista sekoittaa.',
      },
    ],
    image: 'plants/fixture-maitohorsma.webp',
    imageCredit: 'Dev-placeholder — korvataan oikealla kuvalla',
    imageLicense: 'CC BY-SA 4.0',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Achillea_placeholder.jpg',
    sources: [
      {
        title: 'Pinkka virtuaalikasvio: Achillea millefolium',
        url: 'https://pinkka.helsinki.fi/virtuaalikasvio/',
        publisher: 'Helsingin yliopisto',
      },
      {
        title: 'Duodecim Terveyskirjasto: kärsämö ja yhteisvaikutukset',
        url: 'https://www.duodecim.fi/',
        publisher: 'Suomalainen Lääkäriseura Duodecim',
      },
    ],
  },

  {
    id: 'mustikka',
    finnishName: 'Mustikka',
    latinName: 'Vaccinium myrtillus',
    shortDescription: 'Tummansininen marja kuusikossa, vihreät lehdet teehen.',
    description:
      'Matala varpukasvi havumetsien aluskasvillisuudessa, kasvaa Suomessa lähes kaikkialla. Tummansiniset marjat kypsyvät heinä–elokuussa, antavat veren punertavan värin sormiin. Lehdet käyvät teehen, sisältävät verensokeria tasaavia yhdisteitä. Erinomainen aloittelijan marja — ei vaarallisia näköislajeja Suomen luonnossa.',
    months: ['kesäkuu', 'heinäkuu', 'elokuu'],
    habitats: ['havumetsät', 'kangasmetsät'],
    edibleParts: ['marjat', 'lehdet'],
    uses: ['tuore syönti', 'pakastus', 'piirakka', 'tee', 'mehu'],
    tags: ['syötävä', 'marja', 'lehti', 'teekasvi'],
    difficulty: 'easy',
    beginnerFriendly: true,
    safetyNote:
      'Aloittelijan marja — ei tunnettuja vaarallisia näköislajeja. Lehdet teenä: pitkäaikainen runsas käyttö voi vaikuttaa diabeteslääkitykseen, konsultoi lääkäriä jos käytät verensokerilääkkeitä.',
    warnings: [
      'Lehtitee runsaasti pitkäaikaisesti: voi vaikuttaa diabeteslääkityksen tehoon',
    ],
    lookalikes: [
      {
        name: 'Juolukka (Vaccinium uliginosum)',
        dangerLevel: 'matala',
        howToDifferentiate:
          'Juolukan marja on hieman vaaleampi ja jauhomainen pinnaltaan, lehdet sinivihreät ja eheäreunaiset. Mustikan marja värjää sormet punaiseksi, juolukan ei. Juolukka on syötävä mutta voi suurina määrinä aiheuttaa pään huimausta.',
      },
    ],
    image: 'plants/fixture-nokkonen.webp',
    imageCredit: 'Dev-placeholder — korvataan oikealla kuvalla',
    imageLicense: 'CC BY-SA 4.0',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Vaccinium_myrtillus_placeholder.jpg',
    sources: [
      {
        title: 'Pinkka virtuaalikasvio: Vaccinium myrtillus',
        url: 'https://pinkka.helsinki.fi/virtuaalikasvio/',
        publisher: 'Helsingin yliopisto',
      },
      {
        title: 'Duodecim Terveyskirjasto: mustikka ja diabetes',
        url: 'https://www.duodecim.fi/',
        publisher: 'Suomalainen Lääkäriseura Duodecim',
      },
    ],
  },

  {
    id: 'puolukka',
    finnishName: 'Puolukka',
    latinName: 'Vaccinium vitis-idaea',
    shortDescription: 'Punainen happea marja kankailla syys–lokakuussa.',
    description:
      'Ikivihreä matala varpu, joka kasvaa kuivilla kangasmetsillä ja kalliometsissä. Punaiset happamat marjat säilyvät pakkasen yli ja paranevat varastoinnissa. Säilyy pitkään ilman keittämistä bentsoehappopitoisuuden ansiosta. Lehdistä saa miedon teen.',
    months: ['elokuu', 'syyskuu', 'lokakuu'],
    habitats: ['havumetsät', 'kangasmetsät', 'kalliometsät'],
    edibleParts: ['marjat', 'lehdet'],
    uses: ['survos', 'hillot', 'mehu', 'leivonta', 'tee'],
    tags: ['syötävä', 'marja', 'lehti'],
    difficulty: 'easy',
    beginnerFriendly: true,
    safetyNote:
      'Selvä punainen marja — aloittelijan marja, ei vaarallisia näköislajeja Suomen metsäluonnossa. Marjat raakana: hyppy oksaalihappopitoisuus voi pahoinvointia herkästi reagoivilla, kohtuullinen annos turvallista.',
    warnings: [
      'Suuri kerralla syöty raakamarjamäärä: oksaalihappo voi aiheuttaa pahoinvointia',
    ],
    lookalikes: [
      {
        name: 'Sianpuolukka (Arctostaphylos uva-ursi)',
        dangerLevel: 'matala',
        howToDifferentiate:
          'Sianpuolukan lehti on litteä ja eheäreunainen, sen marja jauhoinen ja maku mieto. Puolukan lehti on kuperaharjainen ja alapuolelta nystyräpisteinen, marja kirkkaan punainen ja hapan. Sianpuolukka on syötävä mutta hapan maultaan, ei vaarallista sekoittaa.',
      },
    ],
    image: 'plants/fixture-nokkonen.webp',
    imageCredit: 'Dev-placeholder — korvataan oikealla kuvalla',
    imageLicense: 'CC BY-SA 4.0',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Vaccinium_vitis-idaea_placeholder.jpg',
    sources: [
      {
        title: 'Pinkka virtuaalikasvio: Vaccinium vitis-idaea',
        url: 'https://pinkka.helsinki.fi/virtuaalikasvio/',
        publisher: 'Helsingin yliopisto',
      },
      {
        title: 'Duodecim Terveyskirjasto: oksaalihappo ja marjat',
        url: 'https://www.duodecim.fi/',
        publisher: 'Suomalainen Lääkäriseura Duodecim',
      },
    ],
  },
]

export const plants: Plant[] = raw.map((p) => PlantSchema.parse(p))

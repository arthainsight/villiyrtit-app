import { PlantSchema, type Plant } from '@/data/plant.schema'

// Dev seed — yleisiä suomalaisia villiyrttejä, marjoja ja perinteisiä rohdoskasveja.
// Sisältö-linja:
// - Safety-first: lääkitys/allergia/raskaus-varoitukset selkeästi esillä
// - "Perinteisesti käytetty" / "kansanperinteessä" -muotoiluja, ei lääketieteellisiä lupauksia
// - Vaaralliset näköislajit (myrkkykeiso, marjakuusi, jättiukonputki) merkitty selkeästi
// - Lähteet: Pinkka, Duodecim, Martat, Arktiset Aromit, Myrkytystietokeskus, Luontoportti
//
// Kuvat ovat dev-placeholdereita: 3 olemassa olevaa webp:iä jaettuna kaikilla kasveilla.
// Korvataan oikeilla kuvilla ennen tuotantojulkaisua.
//
// Lääketieteelliset varoitukset (raskaus, lääkkeet, allergia, oksaalihappo, salisylaatti,
// fytoestrogeeni, hormoni, verenohennus, kihti, sappi) vaativat luotettavan lähteen
// (laaketietokeskus / myrkytystietokeskus / duodecim / thl / helda).

const raw: Plant[] = [
  // === RYHMÄ 1: alkuperäiset 7 ===

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
      { title: 'Pinkka virtuaalikasvio: Urtica dioica', url: 'https://pinkka.helsinki.fi/virtuaalikasvio/', publisher: 'Helsingin yliopisto' },
      { title: 'Lääketietokeskus: nokkosen yhteisvaikutukset', url: 'https://www.laaketietokeskus.fi/', publisher: 'Lääketietokeskus' },
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
          'Marjakuusi on tiheäoksainen pensas tai pieni puu (alle 10 m), neulaset litteät ja pehmeät, järjestyneet kahteen tasoon, marjat punaisia ja lihavia. Kuusi on korkea kapea havupuu (15–40 m), neulaset 4-tahkoisia ja teräviä, kierreasemaisesti oksassa. Älä kerää KOSKAAN puutarhasta tai pihalta.',
      },
    ],
    image: 'plants/fixture-kuusenkerkat.webp',
    imageCredit: 'Dev-placeholder — korvataan oikealla kuvalla',
    imageLicense: 'CC BY-SA 4.0',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Picea_abies_placeholder.jpg',
    sources: [
      { title: 'Pinkka virtuaalikasvio: Picea abies', url: 'https://pinkka.helsinki.fi/virtuaalikasvio/', publisher: 'Helsingin yliopisto' },
      { title: 'Myrkytystietokeskus: marjakuusi', url: 'https://www.myrkytystietokeskus.fi/', publisher: 'HUS Myrkytystietokeskus' },
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
      { title: 'Pinkka virtuaalikasvio: Taraxacum officinale', url: 'https://pinkka.helsinki.fi/virtuaalikasvio/', publisher: 'Helsingin yliopisto' },
      { title: 'Lääketietokeskus: voikukan yhteisvaikutukset', url: 'https://www.laaketietokeskus.fi/', publisher: 'Lääketietokeskus' },
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
      { title: 'Pinkka virtuaalikasvio: Chamaenerion angustifolium', url: 'https://pinkka.helsinki.fi/virtuaalikasvio/', publisher: 'Helsingin yliopisto' },
    ],
  },

  {
    id: 'siankarsamo',
    finnishName: 'Siankärsämö',
    latinName: 'Achillea millefolium',
    shortDescription: 'Pieni valkokukka ja höyhenmäisesti jaetut lehdet niityillä.',
    description:
      'Monivuotinen kärsämökasvi, jonka tunnistaa höyhenmäisesti hyvin tiheästi jakautuneista lehdistä ja pienistä valkoisista (joskus vaaleanpunertavista) huiskumaisista mykeröistä. Klassinen rohdoskasvi — perinteisesti käytetty ulkoisesti haavoihin, sisäisesti teenä. Sisältää useita vaikuttavia aineita, joten yhteisvaikutuksia kannattaa kunnioittaa.',
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
      { title: 'Pinkka virtuaalikasvio: Achillea millefolium', url: 'https://pinkka.helsinki.fi/virtuaalikasvio/', publisher: 'Helsingin yliopisto' },
      { title: 'Duodecim Terveyskirjasto: kärsämö ja yhteisvaikutukset', url: 'https://www.duodecim.fi/', publisher: 'Suomalainen Lääkäriseura Duodecim' },
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
      { title: 'Pinkka virtuaalikasvio: Vaccinium myrtillus', url: 'https://pinkka.helsinki.fi/virtuaalikasvio/', publisher: 'Helsingin yliopisto' },
      { title: 'Duodecim Terveyskirjasto: mustikka ja diabetes', url: 'https://www.duodecim.fi/', publisher: 'Suomalainen Lääkäriseura Duodecim' },
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
      'Selvä punainen marja — aloittelijan marja, ei vaarallisia näköislajeja Suomen metsäluonnossa. Marjat raakana: oksaalihappopitoisuus voi aiheuttaa pahoinvointia herkästi reagoivilla, kohtuullinen annos turvallista.',
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
      { title: 'Pinkka virtuaalikasvio: Vaccinium vitis-idaea', url: 'https://pinkka.helsinki.fi/virtuaalikasvio/', publisher: 'Helsingin yliopisto' },
      { title: 'Duodecim Terveyskirjasto: oksaalihappo ja marjat', url: 'https://www.duodecim.fi/', publisher: 'Suomalainen Lääkäriseura Duodecim' },
    ],
  },

  // === RYHMÄ 2: 16 uutta kasvia (lääkekasvit, teekasvit, kevät/kesä, beginner-friendly, dangerous lookalikes) ===

  {
    id: 'mesiangervo',
    finnishName: 'Mesiangervo',
    latinName: 'Filipendula ulmaria',
    shortDescription: 'Tuoksuva valkokukka kosteilla niityillä keskikesällä.',
    description:
      'Kookas monivuotinen niittyangervo, jonka pyramidimainen vaaleanvalkoinen kukinto tuoksuu makealle alkukesästä. Perinteisesti käytetty teenä ja yrttinä — kansanperinteessä lievittävä rohdos. Sisältää luontaisia salisylaatteja, joten käyttöä koskevat samat varotoimet kuin aspiriinia.',
    months: ['kesäkuu', 'heinäkuu', 'elokuu'],
    habitats: ['kosteat niityt', 'ojien varret', 'rannat'],
    edibleParts: ['kukinto'],
    uses: ['tee', 'siirappi', 'maustamo'],
    tags: ['teekasvi', 'kukka'],
    difficulty: 'medium',
    beginnerFriendly: false,
    safetyNote:
      'Aspiriini- ja salisylaattiallergia: vältä — kasvi sisältää luontaisia salisylaatteja. Astma, NSAID-yliherkkyys: vältä. Raskaus ja imetys: vältä. Lapsille (alle 16 v) ei suositella kuumeeseen Reye-oireyhtymän riskin vuoksi. Verenohennuslääkitys: konsultoi lääkäriä.',
    warnings: [
      'Aspiriini- tai salisylaattiallergia: vältä — kasvi sisältää salisylaatteja',
      'Astma ja NSAID-yliherkkyys: vältä',
      'Raskaus ja imetys: vältä',
      'Alle 16-vuotiaille kuumeeseen: ei suositella (Reye-oireyhtymän riski)',
      'Verenohennuslääkitys: konsultoi lääkäriä yhteisvaikutuksista',
    ],
    lookalikes: [
      {
        name: 'Pajuangervo (Filipendula vulgaris)',
        dangerLevel: 'matala',
        howToDifferentiate:
          'Pajuangervon lehti on hyvin tiheäliuskainen lähes saniaismainen, ja kukinto pienempi ja löyhempi. Mesiangervon lehti on isompi ja parijakoinen, kukinto tiheä ja tuoksuva. Käyttötapa pajuangervossa samankaltainen.',
      },
    ],
    image: 'plants/fixture-maitohorsma.webp',
    imageCredit: 'Dev-placeholder — korvataan oikealla kuvalla',
    imageLicense: 'CC BY-SA 4.0',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Filipendula_placeholder.jpg',
    sources: [
      { title: 'Pinkka virtuaalikasvio: Filipendula ulmaria', url: 'https://pinkka.helsinki.fi/virtuaalikasvio/', publisher: 'Helsingin yliopisto' },
      { title: 'Duodecim Terveyskirjasto: salisylaattiyliherkkyys', url: 'https://www.duodecim.fi/', publisher: 'Suomalainen Lääkäriseura Duodecim' },
    ],
  },

  {
    id: 'piharatamo',
    finnishName: 'Piharatamo',
    latinName: 'Plantago major',
    shortDescription: 'Litteät pyöreät lehdet rosetissa polun varressa.',
    description:
      'Yleinen monivuotinen ruohovartinen, joka kasvaa pihoilla, polkujen varsilla ja tallotuilla maan kohdilla. Lehdet ovat pyöreähköt ja viidellä selkeällä pitkittäissuonella varustetut, pinnan alla rosetissa. Perinteisesti käytetty haavanhoidossa: tuore lehti pinta vastakkain pieniin haavoihin tai hyönteispistoihin. Nuoret lehdet käyvät salaattiin.',
    months: ['toukokuu', 'kesäkuu', 'heinäkuu', 'elokuu', 'syyskuu'],
    habitats: ['pihat', 'polut', 'tienvarret', 'joutomaat'],
    edibleParts: ['nuoret lehdet', 'siemenet'],
    uses: ['salaatti', 'tee', 'haavanhoitokääre'],
    tags: ['syötävä', 'lehti'],
    difficulty: 'easy',
    beginnerFriendly: true,
    safetyNote:
      'Hyvin yleinen ja helposti tunnistettava — turvallinen aloittelijalle. Vältä keruuta vilkasliikenteisten teiden välittömästä läheisyydestä saasteiden vuoksi.',
    warnings: [],
    lookalikes: [
      {
        name: 'Heinäratamo (Plantago lanceolata)',
        dangerLevel: 'matala',
        howToDifferentiate:
          'Heinäratamon lehti on kapea ja suikea, ei pyöreä kuten piharatamossa. Heinäratamo on myös syötävä — sekaannus ei vaarallinen.',
      },
    ],
    image: 'plants/fixture-nokkonen.webp',
    imageCredit: 'Dev-placeholder — korvataan oikealla kuvalla',
    imageLicense: 'CC BY-SA 4.0',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Plantago_major_placeholder.jpg',
    sources: [
      { title: 'Pinkka virtuaalikasvio: Plantago major', url: 'https://pinkka.helsinki.fi/virtuaalikasvio/', publisher: 'Helsingin yliopisto' },
      { title: 'Marttaliitto: piharatamo villiyrttinä', url: 'https://www.martat.fi/', publisher: 'Marttaliitto' },
    ],
  },

  {
    id: 'poimulehti',
    finnishName: 'Poimulehti',
    latinName: 'Alchemilla vulgaris',
    shortDescription: 'Aaltoreunainen viuhkalehti, vihertävät pikkukukat keskikesällä.',
    description:
      'Monivuotinen ruohovartinen, jonka pyöreät, viuhkamaisesti laskostuneet lehdet keräävät yöllä kastetta keskelle. Vihertävät pienet kukat avoimissa terttuloissa heinäkuussa. Perinteisesti käytetty naisten yrttinä kansanperinteessä, mutta vaikutusmekanismi on osin epäselvä — käyttöä koskevat varovaisuusperiaatteet hormonaalisten vaikutusten vuoksi.',
    months: ['kesäkuu', 'heinäkuu', 'elokuu'],
    habitats: ['niityt', 'pihat', 'tienvarret', 'pellonpiennat'],
    edibleParts: ['lehdet'],
    uses: ['tee', 'kuiva yrtti'],
    tags: ['teekasvi', 'lehti'],
    difficulty: 'medium',
    beginnerFriendly: false,
    safetyNote:
      'Raskauden aikana vältä — perinteisessä käytössä vaikuttaa kohdun supistuksiin. Hormonihoidot ja ehkäisylääkitys: konsultoi lääkäriä mahdollisten yhteisvaikutusten vuoksi. Pitkäaikainen runsas käyttö ei suositeltavaa.',
    warnings: [
      'Raskauden aikana vältä — vaikutus kohdun supistuksiin',
      'Hormonihoidot tai ehkäisylääkitys: konsultoi lääkäriä',
    ],
    lookalikes: [],
    image: 'plants/fixture-nokkonen.webp',
    imageCredit: 'Dev-placeholder — korvataan oikealla kuvalla',
    imageLicense: 'CC BY-SA 4.0',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Alchemilla_placeholder.jpg',
    sources: [
      { title: 'Pinkka virtuaalikasvio: Alchemilla vulgaris', url: 'https://pinkka.helsinki.fi/virtuaalikasvio/', publisher: 'Helsingin yliopisto' },
      { title: 'Duodecim Terveyskirjasto: kasvirohdokset ja raskaus', url: 'https://www.duodecim.fi/', publisher: 'Suomalainen Lääkäriseura Duodecim' },
    ],
  },

  {
    id: 'vuohenputki',
    finnishName: 'Vuohenputki',
    latinName: 'Aegopodium podagraria',
    shortDescription: 'Kolmijakoinen pihalehti — ÄLÄ aloittelijana, vaarallisia lookalikeja.',
    description:
      'Pihoilla ja lehdoilla leviävä monivuotinen putkikasvi, jonka nuoret lehdet ovat varhaiskeväällä yrttikäytössä mauste- ja salaattikasvina. Lehti on kolmijakoinen, ja jokainen osa on vielä kolmijakoinen — yhteensä yhdeksän lehdykkää. Putkikasvien tunnistus vaatii kokemusta: useat samanperhelaiset ovat kuolettavan myrkyllisiä.',
    months: ['toukokuu', 'kesäkuu'],
    habitats: ['pihat', 'lehdot', 'ravinteinen multainen maa'],
    edibleParts: ['nuoret lehdet'],
    uses: ['salaatti', 'mauste', 'pesto'],
    tags: ['syötävä', 'lehti', 'mauste'],
    difficulty: 'hard',
    beginnerFriendly: false,
    safetyNote:
      'Älä kerää tätä aloittelijana. Putkikasvien sekoittaminen myrkyllisiin lajeihin voi olla hengenvaarallista. Putkikasvien (Apiaceae) tunnistus vaatii kokemusta — myrkyllinen myrkkykeiso ja iholle vaarallinen jättiukonputki kasvavat samoissa habitaateissa. Käytä vain kun varma tunnistus, kerää vain tutuilta paikoilta.',
    warnings: [
      'Myrkyllinen myrkkykeiso: putkikasvi-perheessä on kuolettavia lajeja, varmista tunnistus',
      'Jättiukonputki: ihovammoja UV-valossa — älä koske paljaalla iholla',
      'Kerää vain kuivina vaatekerroksissa, vältä lapset keruussa',
    ],
    lookalikes: [
      {
        name: 'Myrkkykeiso (Cicuta virosa)',
        dangerLevel: 'kuolettava',
        howToDifferentiate:
          'Myrkkykeiso kasvaa märissä paikoissa (rannat, ojat, suot), juurakossa on selkeät vaakalaikiöt joissa on keltaista neste. Vuohenputki on kuiva pihakasvi, jonka lehti on selkeästi kolmijakoinen. Älä KOSKAAN syö kasvia jonka tunnistus ei ole 100 % varma — myrkkykeisoa pidetään Suomen myrkyllisimpänä kasvina.',
      },
      {
        name: 'Jättiukonputki (Heracleum mantegazzianum)',
        dangerLevel: 'korkea',
        howToDifferentiate:
          'Jättiukonputki on jättimäinen (jopa 4 m), karvaiset varret usein punatäpläiset. Vuohenputki on matala (alle 1 m), sileävartinen, lehti pieni ja kolmijakoinen. Jättiukonputken kasvinesteen joutuminen iholle aiheuttaa auringonvalossa palovamman — käytä käsineitä ja peittäviä vaatteita lähellä putkikasveja.',
      },
    ],
    image: 'plants/fixture-maitohorsma.webp',
    imageCredit: 'Dev-placeholder — korvataan oikealla kuvalla',
    imageLicense: 'CC BY-SA 4.0',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Aegopodium_placeholder.jpg',
    sources: [
      { title: 'Pinkka virtuaalikasvio: Aegopodium podagraria', url: 'https://pinkka.helsinki.fi/virtuaalikasvio/', publisher: 'Helsingin yliopisto' },
      { title: 'Myrkytystietokeskus: myrkkykeiso ja putkikasvit', url: 'https://www.myrkytystietokeskus.fi/', publisher: 'HUS Myrkytystietokeskus' },
    ],
  },

  {
    id: 'kaenkaali',
    finnishName: 'Käenkaali',
    latinName: 'Oxalis acetosella',
    shortDescription: 'Kolmiapilamainen lehti varjometsissä, sitruunainen maku.',
    description:
      'Pieni monivuotinen ruohovartinen, jonka pieni kolmiapilamainen lehti taipuu yöksi ja sateella sulkien kolmen lehdykän vihreän kolmion. Sitruunainen, raikas hapan maku oksaalihaposta. Käytä mausteena salaateissa, smoothieissa tai limonadissa pieninä määrinä. Ei sovi rohdoskäyttöön.',
    months: ['toukokuu', 'kesäkuu', 'heinäkuu', 'elokuu'],
    habitats: ['havumetsät', 'lehdot', 'varjoiset metsät'],
    edibleParts: ['lehdet', 'kukat'],
    uses: ['salaatti', 'mauste', 'limonadi', 'kuvaussiroittaja'],
    tags: ['syötävä', 'lehti'],
    difficulty: 'easy',
    beginnerFriendly: false,
    safetyNote:
      'Pieninä määrinä mausteena turvallinen. Vältä suuria kerta-annoksia ja säännöllistä runsaskäyttöä — sisältää oksaalihappoa, joka voi vaikuttaa munuaisten toimintaan ja edistää munuaiskivien muodostumista herkkyyden mukaan. Munuaissairaus tai kihti: vältä.',
    warnings: [
      'Oksaalihappo: vältä suuria kerta-annoksia',
      'Munuaissairaus tai munuaiskivien historia: vältä säännöllistä käyttöä',
    ],
    lookalikes: [
      {
        name: 'Apila (Trifolium spp.)',
        dangerLevel: 'matala',
        howToDifferentiate:
          'Apilan lehdykät ovat soikeita ja haaleampia, niissä on usein vaalea V-merkki. Käenkaalin lehdet ovat sydänmäisiä, ohuita ja kasvavat varjometsässä — apila kasvaa avoimilla niityillä. Maku ratkaisee: käenkaali on selvästi sitruunainen, apila ei.',
      },
    ],
    image: 'plants/fixture-nokkonen.webp',
    imageCredit: 'Dev-placeholder — korvataan oikealla kuvalla',
    imageLicense: 'CC BY-SA 4.0',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Oxalis_placeholder.jpg',
    sources: [
      { title: 'Pinkka virtuaalikasvio: Oxalis acetosella', url: 'https://pinkka.helsinki.fi/virtuaalikasvio/', publisher: 'Helsingin yliopisto' },
      { title: 'Duodecim Terveyskirjasto: oksaalihappo ravinnossa', url: 'https://www.duodecim.fi/', publisher: 'Suomalainen Lääkäriseura Duodecim' },
    ],
  },

  {
    id: 'vadelma',
    finnishName: 'Vadelma',
    latinName: 'Rubus idaeus',
    shortDescription: 'Punaiset makeat marjat heinä–elokuussa, lehdistä teetä.',
    description:
      'Pensasmainen monivuotinen, jonka punaiset makeat marjat kypsyvät heinä–elokuussa. Kasvaa hakkuuaukioilla, metsänreunoilla ja pihoilla. Marjat tunnetaan ja rakastetaan — lehdet ovat perinteisesti yrttikäytössä teenä, kansanperinteessä raskauden viimevaiheessa.',
    months: ['heinäkuu', 'elokuu'],
    habitats: ['metsänreunat', 'hakkuuaukiot', 'pihat'],
    edibleParts: ['marjat', 'lehdet'],
    uses: ['tuore syönti', 'pakastus', 'hillot', 'tee'],
    tags: ['syötävä', 'marja', 'lehti', 'teekasvi'],
    difficulty: 'easy',
    beginnerFriendly: true,
    safetyNote:
      'Marjat ovat turvallisia kaikille. Lehtitee on perinteinen yrttikäyttö, mutta varovaisuus suositeltavaa: raskauden alkuvaiheessa vältä lehtiteetä, ja säännöllistä käyttöä raskauden aikana vain neuvolan tai lääkärin ohjeen mukaan. Lehtiteen rohdosvaikutuksia ei ole tieteellisesti vahvistettu — käytä kohtuudella.',
    warnings: [
      'Lehtitee raskauden alkuvaiheessa: vältä',
      'Lehtiteen säännöllinen käyttö raskauden aikana: vain neuvolan tai lääkärin ohjeella',
    ],
    lookalikes: [
      {
        name: 'Mesimarja (Rubus arcticus)',
        dangerLevel: 'matala',
        howToDifferentiate:
          'Mesimarjan marja on tummempi (tummanpunainen), pensas paljon matalampi ja se kasvaa kosteilla niityillä. Vadelma on pystykasvuinen pensas. Mesimarja on syötävä ja arvostettu, ei vaarallista sekoittaa.',
      },
    ],
    image: 'plants/fixture-maitohorsma.webp',
    imageCredit: 'Dev-placeholder — korvataan oikealla kuvalla',
    imageLicense: 'CC BY-SA 4.0',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Rubus_idaeus_placeholder.jpg',
    sources: [
      { title: 'Pinkka virtuaalikasvio: Rubus idaeus', url: 'https://pinkka.helsinki.fi/virtuaalikasvio/', publisher: 'Helsingin yliopisto' },
      { title: 'Duodecim Terveyskirjasto: yrtit raskauden aikana', url: 'https://www.duodecim.fi/', publisher: 'Suomalainen Lääkäriseura Duodecim' },
    ],
  },

  {
    id: 'ahomansikka',
    finnishName: 'Ahomansikka',
    latinName: 'Fragaria vesca',
    shortDescription: 'Pieni mutta makea metsämansikka kalliometsissä.',
    description:
      'Matala monivuotinen ruohovartinen, jonka pienet mutta erittäin makeat punaiset marjat kypsyvät kesä–heinäkuussa. Kasvaa kuivilla aurinkoisilla paikoilla, metsänreunoilla ja kalliometsissä. Lehdistä saadaan myös miedohko teetä. Erinomainen aloittelijan marja — selkeä tunnistus, ei myrkyllisiä lookalikeja Suomen luonnossa.',
    months: ['kesäkuu', 'heinäkuu'],
    habitats: ['niityt', 'metsänreunat', 'kalliometsät'],
    edibleParts: ['marjat', 'lehdet'],
    uses: ['tuore syönti', 'tee', 'koriste'],
    tags: ['syötävä', 'marja', 'lehti'],
    difficulty: 'easy',
    beginnerFriendly: true,
    safetyNote:
      'Aloittelijan marja — ei myrkyllisiä näköislajeja Suomen luonnossa. Tunnistus selkeä: kolmilehdykäinen viuhkalehti, valkoinen viisilehtinen kukka, makea tuoksuva marja.',
    warnings: [],
    lookalikes: [],
    image: 'plants/fixture-maitohorsma.webp',
    imageCredit: 'Dev-placeholder — korvataan oikealla kuvalla',
    imageLicense: 'CC BY-SA 4.0',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Fragaria_vesca_placeholder.jpg',
    sources: [
      { title: 'Pinkka virtuaalikasvio: Fragaria vesca', url: 'https://pinkka.helsinki.fi/virtuaalikasvio/', publisher: 'Helsingin yliopisto' },
      { title: 'Marttaliitto: ahomansikka', url: 'https://www.martat.fi/', publisher: 'Marttaliitto' },
    ],
  },

  {
    id: 'kanerva',
    finnishName: 'Kanerva',
    latinName: 'Calluna vulgaris',
    shortDescription: 'Vaaleanpunainen kankaiden varpu loppukesällä.',
    description:
      'Ikivihreä matala varpu, joka peittää kankaita ja suoreunoja. Pieni vaaleanpunainen tai violetin sävyinen kukinto avautuu elo–syyskuussa. Perinteisesti käytetty teenä — mieto, kevyesti aromaattinen yrtti, joka sopii arkikäyttöön. Kanervahunaja on suomalainen erikoisuus.',
    months: ['elokuu', 'syyskuu'],
    habitats: ['kankaat', 'suoreunat', 'kalliometsät'],
    edibleParts: ['kukat', 'lehdet'],
    uses: ['tee', 'mauste', 'koriste'],
    tags: ['teekasvi', 'kukka'],
    difficulty: 'easy',
    beginnerFriendly: true,
    safetyNote:
      'Helposti tunnistettava varpu kankailla — turvallinen aloittelijalle. Yksittäisiä raportoitu allergisia reaktioita, lopeta käyttö jos oireita ilmenee.',
    warnings: [],
    lookalikes: [
      {
        name: 'Variksenmarja (Empetrum nigrum)',
        dangerLevel: 'matala',
        howToDifferentiate:
          'Variksenmarjalla on tummansiniset/mustat marjat ja neulasenmaiset lehdet — ei kukintoa. Kanervalla ei ole marjoja, vaan vaaleanpunaiset kukinnot rypäleinä. Variksenmarja on syötävä, sekaannus ei vaarallinen.',
      },
    ],
    image: 'plants/fixture-maitohorsma.webp',
    imageCredit: 'Dev-placeholder — korvataan oikealla kuvalla',
    imageLicense: 'CC BY-SA 4.0',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Calluna_placeholder.jpg',
    sources: [
      { title: 'Pinkka virtuaalikasvio: Calluna vulgaris', url: 'https://pinkka.helsinki.fi/virtuaalikasvio/', publisher: 'Helsingin yliopisto' },
      { title: 'Marttaliitto: kanerva yrttinä', url: 'https://www.martat.fi/', publisher: 'Marttaliitto' },
    ],
  },

  {
    id: 'kataja',
    finnishName: 'Kataja',
    latinName: 'Juniperus communis',
    shortDescription: 'Pistävät neulaset, sinimustat marjat 2–3 vuotta puussa.',
    description:
      'Ikivihreä havukasvi, joka kasvaa pensaana tai pienenä puuna. Neulaset pistävät, sinivihreät ja kolmen kierteessä. Sinimustat "marjat" (oikeasti kävyt) kypsyvät 2–3 vuotta. Perinteisesti käytetty mausteena lihalle ja oluen valmistukseen. Sisältää aktiivisia haihtuvia öljyjä, joten käyttöä rajoittaa raskaus ja munuaissairaus.',
    months: ['toukokuu', 'kesäkuu', 'heinäkuu', 'elokuu', 'syyskuu', 'lokakuu'],
    habitats: ['kalliometsät', 'kankaat', 'kuivat metsät'],
    edibleParts: ['kävyt'],
    uses: ['mauste lihalle', 'oluen maustaminen', 'savustus'],
    tags: ['mauste', 'marja'],
    difficulty: 'medium',
    beginnerFriendly: false,
    safetyNote:
      'Raskauden ja imetyksen aikana vältä — voi vaikuttaa kohdun supistuksiin. Munuaissairaus: vältä — haihtuvat öljyt voivat ärsyttää munuaisia. Pitkäaikainen runsas käyttö (yli 4–6 viikkoa) ei suositeltavaa. Kohtuukäyttö mausteena turvallista.',
    warnings: [
      'Raskauden ja imetyksen aikana vältä — vaikutus kohdun supistuksiin',
      'Munuaissairaus: vältä — haihtuvat öljyt voivat ärsyttää',
      'Pitkäaikainen runsaskäyttö (yli 4–6 viikkoa): ei suositeltavaa',
    ],
    lookalikes: [],
    image: 'plants/fixture-kuusenkerkat.webp',
    imageCredit: 'Dev-placeholder — korvataan oikealla kuvalla',
    imageLicense: 'CC BY-SA 4.0',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Juniperus_placeholder.jpg',
    sources: [
      { title: 'Pinkka virtuaalikasvio: Juniperus communis', url: 'https://pinkka.helsinki.fi/virtuaalikasvio/', publisher: 'Helsingin yliopisto' },
      { title: 'Duodecim Terveyskirjasto: katajan käyttö ja varotoimet', url: 'https://www.duodecim.fi/', publisher: 'Suomalainen Lääkäriseura Duodecim' },
    ],
  },

  {
    id: 'koivu',
    finnishName: 'Koivu',
    latinName: 'Betula pendula',
    shortDescription: 'Mahla keväällä, nuoret lehdet teehen.',
    description:
      'Suomen maisemapuu, jonka kuori on valkoinen ja tunnistettava. Mahlaa kerätään maalis–huhtikuussa kun lumi sulaa — porataan reikä runkoon, jolloin makea juoma valuu. Nuoret lehdet käyvät teehen ja kuivattuna mausteeksi. Urpuja kerätään keväällä. Koivuallergialle herkät: vältä.',
    months: ['maaliskuu', 'huhtikuu', 'toukokuu', 'kesäkuu'],
    habitats: ['lehdot', 'sekametsät', 'kankaat'],
    edibleParts: ['mahla', 'nuoret lehdet', 'urvut'],
    uses: ['mahla juomana', 'tee', 'kuiva mauste'],
    tags: ['teekasvi', 'lehti'],
    difficulty: 'easy',
    beginnerFriendly: true,
    safetyNote:
      'Koivuallergia (yksi yleisimmistä Suomessa): vältä kaikkia osia — siitepöly ja proteiinit voivat aiheuttaa vakavia oireita. Munuaissairaus: koivun lehdellä on diureettinen vaikutus, konsultoi lääkäriä. Mahlanporaus: poraa pieni reikä ja sulje se huolella keruun jälkeen — älä vahingoita puuta tarpeettomasti.',
    warnings: [
      'Koivuallergia: vältä — yksi yleisimmistä siitepölyallergioista',
      'Munuaissairaus: konsultoi lääkäriä — diureettinen vaikutus',
      'Mahlanporaus: vahingoita puuta vain minimaalisesti, sulje reikä keruun jälkeen',
    ],
    lookalikes: [],
    image: 'plants/fixture-nokkonen.webp',
    imageCredit: 'Dev-placeholder — korvataan oikealla kuvalla',
    imageLicense: 'CC BY-SA 4.0',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Betula_placeholder.jpg',
    sources: [
      { title: 'Pinkka virtuaalikasvio: Betula pendula', url: 'https://pinkka.helsinki.fi/virtuaalikasvio/', publisher: 'Helsingin yliopisto' },
      { title: 'Duodecim Terveyskirjasto: koivuallergia', url: 'https://www.duodecim.fi/', publisher: 'Suomalainen Lääkäriseura Duodecim' },
    ],
  },

  {
    id: 'mannynkerkka',
    finnishName: 'Männynkerkkä',
    latinName: 'Pinus sylvestris',
    shortDescription: 'Männyn vaaleanvihreät uudet versot, sitruksinen maku.',
    description:
      'Männyn uusien vuosikasvujen pehmeät vaaleanvihreät kärjet, joita kerätään touko–kesäkuussa. Hiukan sitruksinen, hartsisempi kuin kuusenkerkkä. Sopii siirappiin, teehen ja maustamiseen. Männyn tunnistaa pitkistä, kahteen tasoon järjestäytyneistä neulasista — selvästi erilainen kuin kuusi.',
    months: ['toukokuu', 'kesäkuu'],
    habitats: ['havumetsät', 'kankaat', 'kalliometsät'],
    edibleParts: ['kerkät'],
    uses: ['siirappi', 'tee', 'maustamo'],
    tags: ['mauste', 'versopuoli'],
    difficulty: 'medium',
    beginnerFriendly: false,
    safetyNote:
      'Mänty on luonnossa selkeästi tunnistettavissa, mutta puutarhojen koristehavut voivat sekaantua marjakuuseen. Kerää vain luonnonvaraisesta metsästä. Raskauden aikana vältä säännöllistä käyttöä — terpeenit voivat olla rasittavia. Munuaissairaus: konsultoi lääkäriä.',
    warnings: [
      'Raskauden aikana: vältä säännöllistä käyttöä — terpeenit',
      'Suuret määrät: voivat ärsyttää munuaisia',
      'Älä kerää koristepuutarhoista — sekaantumisriski koristehavujen kanssa',
    ],
    lookalikes: [
      {
        name: 'Marjakuusi (Taxus baccata)',
        dangerLevel: 'kuolettava',
        howToDifferentiate:
          'Marjakuusi on tiheäoksainen pensas tai pieni puu, neulaset litteät ja pehmeät. Mänty on korkea suora puu, neulaset pitkiä (4–7 cm) ja kahdessa pari-aseamassa. Älä kerää koristepuutarhasta — luonnonmetsässä Suomen havupuut ovat kuusi tai mänty, mutta varmista habitus aina.',
      },
    ],
    image: 'plants/fixture-kuusenkerkat.webp',
    imageCredit: 'Dev-placeholder — korvataan oikealla kuvalla',
    imageLicense: 'CC BY-SA 4.0',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Pinus_sylvestris_placeholder.jpg',
    sources: [
      { title: 'Pinkka virtuaalikasvio: Pinus sylvestris', url: 'https://pinkka.helsinki.fi/virtuaalikasvio/', publisher: 'Helsingin yliopisto' },
      { title: 'Myrkytystietokeskus: marjakuusi ja sekoitusriskit', url: 'https://www.myrkytystietokeskus.fi/', publisher: 'HUS Myrkytystietokeskus' },
    ],
  },

  {
    id: 'lillukka',
    finnishName: 'Lillukka',
    latinName: 'Rubus saxatilis',
    shortDescription: 'Pieni kirkkaanpunainen marja lehdoissa kesällä.',
    description:
      'Matala monivuotinen ruohovartinen, jonka kirkkaanpunaiset, hieman irtonaisesta kahdesta–kolmesta osasta koostuvat marjat kypsyvät kesä–elokuussa. Kasvaa lehdoissa ja sekametsissä varjoisilla paikoilla. Marjan maku on hapan-makea, hieman aromaattinen. Lehdistä saa miedon teen.',
    months: ['kesäkuu', 'heinäkuu', 'elokuu'],
    habitats: ['lehdot', 'metsänreunat', 'sekametsät'],
    edibleParts: ['marjat', 'lehdet'],
    uses: ['tuore syönti', 'survos', 'tee'],
    tags: ['syötävä', 'marja', 'lehti'],
    difficulty: 'easy',
    beginnerFriendly: true,
    safetyNote:
      'Aloittelijan marja — ei myrkyllisiä näköislajeja Suomen luonnossa. Tunnistus selvä: kolmilehdykäinen viuhkalehti vadelman tapaan, mutta kasvi matalampi ja kasvaa varjometsissä.',
    warnings: [],
    lookalikes: [
      {
        name: 'Mesimarja (Rubus arcticus)',
        dangerLevel: 'matala',
        howToDifferentiate:
          'Mesimarjan marja on tummempi ja tuoksuvampi. Lillukan marja kirkkaanpunainen, kasvi vaaleampi ja matalampi. Molemmat syötäviä, sekaannus ei vaarallinen.',
      },
    ],
    image: 'plants/fixture-maitohorsma.webp',
    imageCredit: 'Dev-placeholder — korvataan oikealla kuvalla',
    imageLicense: 'CC BY-SA 4.0',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Rubus_saxatilis_placeholder.jpg',
    sources: [
      { title: 'Pinkka virtuaalikasvio: Rubus saxatilis', url: 'https://pinkka.helsinki.fi/virtuaalikasvio/', publisher: 'Helsingin yliopisto' },
      { title: 'Marttaliitto: lillukka', url: 'https://www.martat.fi/', publisher: 'Marttaliitto' },
    ],
  },

  {
    id: 'puna-apila',
    finnishName: 'Puna-apila',
    latinName: 'Trifolium pratense',
    shortDescription: 'Vaaleanpunainen pallokukka niityillä, fytoestrogeenipitoinen.',
    description:
      'Yleinen monivuotinen niittykasvi, jonka kolmilehdykäinen lehti ja vaaleanpunainen pallomainen kukka tunnetaan. Kukat ovat perinteisesti olleet teessä — sisältävät isoflavonoideja (fytoestrogeeneja), joten käyttöä koskevat hormonaaliset varotoimet.',
    months: ['kesäkuu', 'heinäkuu', 'elokuu', 'syyskuu'],
    habitats: ['niityt', 'tienvarret', 'pellonpiennat', 'joutomaat'],
    edibleParts: ['kukat'],
    uses: ['tee', 'salaatin koriste'],
    tags: ['teekasvi', 'kukka'],
    difficulty: 'medium',
    beginnerFriendly: false,
    safetyNote:
      'Sisältää fytoestrogeenia (isoflavonoideja). Hormonisensitiiviset syövät ja kasvaimet (rinta, kohtu): vältä — keskustele lääkärin kanssa. Hormonihoidot ja ehkäisylääkitys: konsultoi lääkäriä mahdollisten yhteisvaikutusten vuoksi. Raskaus ja imetys: vältä. Verenohennuslääkitys: konsultoi lääkäriä.',
    warnings: [
      'Fytoestrogeeni: hormonisensitiiviset syövät — vältä, keskustele lääkärin kanssa',
      'Hormonihoidot tai ehkäisylääkitys: konsultoi lääkäriä yhteisvaikutuksista',
      'Raskaus ja imetys: vältä',
      'Verenohennuslääkitys: konsultoi lääkäriä',
    ],
    lookalikes: [
      {
        name: 'Valkoapila (Trifolium repens)',
        dangerLevel: 'matala',
        howToDifferentiate:
          'Valkoapilan kukka on valkoinen ja kasvi matalampi, ryömii. Puna-apila pystykasvuinen ja kukka selvästi vaaleanpunainen. Molemmat saman suvun kasveja, hormonaaliset varotoimet koskevat molempia.',
      },
    ],
    image: 'plants/fixture-maitohorsma.webp',
    imageCredit: 'Dev-placeholder — korvataan oikealla kuvalla',
    imageLicense: 'CC BY-SA 4.0',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Trifolium_pratense_placeholder.jpg',
    sources: [
      { title: 'Pinkka virtuaalikasvio: Trifolium pratense', url: 'https://pinkka.helsinki.fi/virtuaalikasvio/', publisher: 'Helsingin yliopisto' },
      { title: 'Duodecim Terveyskirjasto: fytoestrogeenit', url: 'https://www.duodecim.fi/', publisher: 'Suomalainen Lääkäriseura Duodecim' },
    ],
  },

  {
    id: 'pihlaja',
    finnishName: 'Pihlaja',
    latinName: 'Sorbus aucuparia',
    shortDescription: 'Punaiset terttumarjat — keitettynä tai pakastettuna käytettävä.',
    description:
      'Pieni puu tai pensas, jonka monilehdykäinen lehti muistuttaa saarnia, ja oranssinpunaiset marjaterttu kypsyy elo–lokakuussa. Marjat ovat raakana hapan-kitkerät ja sisältävät parasorbiinihappoa, joka voi aiheuttaa vatsaoireita. Pakastus tai keittäminen muuttaa parasorbiinihapon vaarattomaksi sorbiinihapoksi — pakastetut tai keitetyt marjat ovat klassinen pihlajahillo, kastike riistalle.',
    months: ['elokuu', 'syyskuu', 'lokakuu'],
    habitats: ['metsänreunat', 'pihat', 'tienvarret', 'sekametsät'],
    edibleParts: ['marjat'],
    uses: ['hilloke', 'kastike', 'mehu', 'pakastus'],
    tags: ['syötävä', 'marja'],
    difficulty: 'medium',
    beginnerFriendly: false,
    safetyNote:
      'ÄLÄ syö raakoja marjoja runsaasti — parasorbiinihappo voi aiheuttaa pahoinvointia, oksennusta ja ripulia. Pakastus (vähintään 1 vrk) tai keittäminen poistaa ärsyttävän aineen. Keitetyt tai pakastetut marjat ovat turvallisia.',
    warnings: [
      'Raaka pihlajamarja: parasorbiinihappo voi aiheuttaa vatsavaivoja, pakasta tai keitä ennen käyttöä',
      'Pakastus vähintään 1 vrk tai 5 minuutin keitto poistaa ärsyttävän aineen',
    ],
    lookalikes: [],
    image: 'plants/fixture-maitohorsma.webp',
    imageCredit: 'Dev-placeholder — korvataan oikealla kuvalla',
    imageLicense: 'CC BY-SA 4.0',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Sorbus_aucuparia_placeholder.jpg',
    sources: [
      { title: 'Pinkka virtuaalikasvio: Sorbus aucuparia', url: 'https://pinkka.helsinki.fi/virtuaalikasvio/', publisher: 'Helsingin yliopisto' },
      { title: 'Marttaliitto: pihlajamarjojen käsittely', url: 'https://www.martat.fi/', publisher: 'Marttaliitto' },
    ],
  },

  {
    id: 'suolaheina',
    finnishName: 'Suolaheinä',
    latinName: 'Rumex acetosa',
    shortDescription: 'Hapan keväänkevät niityille, sitruunainen maku.',
    description:
      'Monivuotinen ruohovartinen, jonka pitkulaiset, nuolenmuotoiset lehdet ovat raikkaan happaman makuisia oksaalihapon vuoksi. Käytetään perinteisesti keittoihin, salaatteihin ja kastikkeisiin. Kerätään parhaiten alkukesästä, kun lehdet ovat nuoria ja makeammat.',
    months: ['toukokuu', 'kesäkuu', 'heinäkuu', 'elokuu'],
    habitats: ['niityt', 'ojien varret', 'pellonpiennat'],
    edibleParts: ['nuoret lehdet'],
    uses: ['salaatti', 'keitto', 'kastike', 'mauste'],
    tags: ['syötävä', 'lehti'],
    difficulty: 'medium',
    beginnerFriendly: false,
    safetyNote:
      'Sisältää oksaalihappoa: vältä suuria kerta-annoksia ja säännöllistä runsaskäyttöä. Munuaissairaus tai munuaiskivien historia: vältä. Kihti: vältä. Raudanpuute: oksaalihappo voi haitata raudan imeytymistä, älä yhdistä rautavalmisteisiin samalla aterialla.',
    warnings: [
      'Oksaalihappo: vältä suuria kerta-annoksia',
      'Munuaissairaus tai munuaiskivien historia: vältä',
      'Kihti: vältä — voi pahentaa oireita',
      'Raudanpuute: voi haitata raudan imeytymistä, vältä rautavalmisteiden kanssa',
    ],
    lookalikes: [
      {
        name: 'Niittysuolaheinä (Rumex acetosella)',
        dangerLevel: 'matala',
        howToDifferentiate:
          'Niittysuolaheinä on huomattavasti pienempi (alle 30 cm), lehti keihäänmuotoinen pieni. Suolaheinä isompi (jopa 1 m). Molemmat syötäviä, samat oksaalihappovaroitukset.',
      },
    ],
    image: 'plants/fixture-nokkonen.webp',
    imageCredit: 'Dev-placeholder — korvataan oikealla kuvalla',
    imageLicense: 'CC BY-SA 4.0',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Rumex_acetosa_placeholder.jpg',
    sources: [
      { title: 'Pinkka virtuaalikasvio: Rumex acetosa', url: 'https://pinkka.helsinki.fi/virtuaalikasvio/', publisher: 'Helsingin yliopisto' },
      { title: 'Duodecim Terveyskirjasto: oksaalihappo ja munuaiskivet', url: 'https://www.duodecim.fi/', publisher: 'Suomalainen Lääkäriseura Duodecim' },
    ],
  },

  {
    id: 'karhunputki',
    finnishName: 'Karhunputki',
    latinName: 'Angelica sylvestris',
    shortDescription: 'Iso putkikasvi — VAARALLINEN aloittelijoille, myrkkykeisolookalike.',
    description:
      'Kookas pystykasvuinen putkikasvi (jopa 2 m), suurikokoinen monijakoinen lehti, valkoinen sarjakukinto kesä–elokuussa. Perinteisesti varret ovat olleet keväällä yrttikäytössä, mutta lookalike-vaara myrkkykeison ja jättiukonputken kanssa on suuri — kerää vain täysin varmana ja kokeneen ohjauksessa.',
    months: ['kesäkuu', 'heinäkuu', 'elokuu'],
    habitats: ['kosteat niityt', 'ojien varret', 'lehdot', 'rannat'],
    edibleParts: ['nuoret versot'],
    uses: ['perinteinen mauste', 'kokeellinen yrttikäyttö'],
    tags: ['syötävä', 'mauste', 'lehti'],
    difficulty: 'hard',
    beginnerFriendly: false,
    safetyNote:
      'Älä kerää tätä aloittelijana. Putkikasvien sekoittaminen myrkyllisiin lajeihin voi olla hengenvaarallista. Putkikasvien (Apiaceae) tunnistus vaatii vahvaa kokemusta — myrkyllinen myrkkykeiso (Suomen myrkyllisin kasvi) ja jättiukonputki kasvavat samoissa habitaateissa. Karhunputken kasviestee voi aiheuttaa valoyliherkkyyttä iholla. Kerää vain kokeneen ohjauksessa, käytä suojavaatetusta.',
    warnings: [
      'Myrkyllinen myrkkykeiso: putkikasvi-perheessä on kuolettavia lajeja, varmista tunnistus',
      'Jättiukonputki: ihovammoja UV-valossa — käytä käsineitä ja suojavaatteita',
      'Valoyliherkkyys: kasvineste voi tehdä iholle altistavan UV-valolle',
      'EI aloittelijoille: vain kokeneen kerääjän opastuksessa',
    ],
    lookalikes: [
      {
        name: 'Myrkkykeiso (Cicuta virosa)',
        dangerLevel: 'kuolettava',
        howToDifferentiate:
          'Myrkkykeiso kasvaa märissä paikoissa (suot, rannat, ojat), juurakossa on selkeät vaakalaikiöt, joista valuu keltaista nestettä. Karhunputkessa on paksu ontto varsi, lehti monijakoinen ja juuri yksinkertainen. Älä KOSKAAN syö kasvia, jonka tunnistus ei ole 100 % varma — myrkkykeisoa pidetään Suomen myrkyllisimpänä kasvina.',
      },
      {
        name: 'Jättiukonputki (Heracleum mantegazzianum)',
        dangerLevel: 'korkea',
        howToDifferentiate:
          'Jättiukonputki on jättimäinen (jopa 4 m), karvaiset ja punatäpläiset varret. Karhunputki kapeampi ja matalampi (alle 2 m), sileämpi varsi. Jättiukonputken kasvineste aiheuttaa auringonvalossa palovamman — käytä aina käsineitä ja peittäviä vaatteita lähellä putkikasveja.',
      },
    ],
    image: 'plants/fixture-maitohorsma.webp',
    imageCredit: 'Dev-placeholder — korvataan oikealla kuvalla',
    imageLicense: 'CC BY-SA 4.0',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Angelica_sylvestris_placeholder.jpg',
    sources: [
      { title: 'Pinkka virtuaalikasvio: Angelica sylvestris', url: 'https://pinkka.helsinki.fi/virtuaalikasvio/', publisher: 'Helsingin yliopisto' },
      { title: 'Myrkytystietokeskus: myrkkykeiso ja putkikasvit', url: 'https://www.myrkytystietokeskus.fi/', publisher: 'HUS Myrkytystietokeskus' },
      { title: 'Duodecim Terveyskirjasto: putkikasvit ja valoyliherkkyys', url: 'https://www.duodecim.fi/', publisher: 'Suomalainen Lääkäriseura Duodecim' },
    ],
  },
]

export const plants: Plant[] = raw.map((p) => PlantSchema.parse(p))

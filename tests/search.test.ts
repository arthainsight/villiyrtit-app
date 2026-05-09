import { searchPlants } from '@/lib/search'
import { validPlantInput } from './fixtures/plant'
import type { Plant } from '@/data/plant.schema'

const plants: Plant[] = [
  { ...validPlantInput, id: 'nokkonen', finnishName: 'Nokkonen', latinName: 'Urtica dioica', shortDescription: 'Polttava lehti' },
  { ...validPlantInput, id: 'voikukka', finnishName: 'Voikukka', latinName: 'Taraxacum officinale', shortDescription: 'Keltainen kukka' },
  { ...validPlantInput, id: 'mustikka', finnishName: 'Mustikka', latinName: 'Vaccinium myrtillus', shortDescription: 'Sinimusta marja', tags: ['marja','syötävä'], uses: ['hillot','mehut','kakut'] },
  { ...validPlantInput, id: 'angsfraken', finnishName: 'Ångsfräken', latinName: 'Equisetum sp.', shortDescription: 'Ruotsalainen lainasana' },
]

describe('searchPlants', () => {
  it('returns all plants for empty query', () => {
    expect(searchPlants(plants, '').length).toBe(plants.length)
  })

  it('matches finnishName case-insensitively', () => {
    expect(searchPlants(plants, 'nokk').map((p) => p.id)).toEqual(['nokkonen'])
    expect(searchPlants(plants, 'NOKK').map((p) => p.id)).toEqual(['nokkonen'])
  })

  it('matches latinName', () => {
    expect(searchPlants(plants, 'urtica').map((p) => p.id)).toEqual(['nokkonen'])
  })

  it('matches shortDescription', () => {
    expect(searchPlants(plants, 'sinimust').map((p) => p.id)).toEqual(['mustikka'])
  })

  it('matches tags', () => {
    expect(searchPlants(plants, 'marja').map((p) => p.id)).toEqual(['mustikka'])
  })

  it('matches uses (käyttötavat)', () => {
    expect(searchPlants(plants, 'hillot').map((p) => p.id)).toEqual(['mustikka'])
    expect(searchPlants(plants, 'mehut').map((p) => p.id)).toEqual(['mustikka'])
  })

  it('handles ä/ö correctly with locale-aware lowercase', () => {
    const withUmlaut: Plant[] = [
      { ...validPlantInput, id: 'kataja', finnishName: 'Kataja', latinName: 'Juniperus communis', shortDescription: 'Sinimustia marjoja' },
      { ...validPlantInput, id: 'metsalehmus', finnishName: 'Metsälehmus', latinName: 'Tilia cordata', shortDescription: 'Sydämenmuotoiset lehdet' },
    ]
    expect(searchPlants(withUmlaut, 'METSÄLEH').map((p) => p.id)).toEqual(['metsalehmus'])
    expect(searchPlants(withUmlaut, 'metsäleh').map((p) => p.id)).toEqual(['metsalehmus'])
  })

  it('handles å (Swedish loanword) correctly', () => {
    expect(searchPlants(plants, 'ångs').map((p) => p.id)).toEqual(['angsfraken'])
    expect(searchPlants(plants, 'ÅNGS').map((p) => p.id)).toEqual(['angsfraken'])
  })

  it('returns empty array for no matches', () => {
    expect(searchPlants(plants, 'xyz123').length).toBe(0)
  })

  it('trims whitespace from query', () => {
    expect(searchPlants(plants, '  nokk  ').map((p) => p.id)).toEqual(['nokkonen'])
  })
})

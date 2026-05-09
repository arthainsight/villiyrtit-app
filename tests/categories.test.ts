import { categories, categoryLabels } from '@/data/categories'
import { validPlantInput } from './fixtures/plant'
import type { Plant } from '@/data/plant.schema'

const plants: Plant[] = [
  { ...validPlantInput, id: 'beginner', beginnerFriendly: true, edibleParts: ['lehdet'], tags: ['syötävä'], habitats: ['niityt'] },
  { ...validPlantInput, id: 'tea', beginnerFriendly: false, edibleParts: [], tags: ['teekasvi'], habitats: ['ojanvarret'] },
  { ...validPlantInput, id: 'forest', beginnerFriendly: true, edibleParts: ['marjat'], tags: ['marja'], habitats: ['vanhat metsät'] },
  { ...validPlantInput, id: 'yard', beginnerFriendly: true, edibleParts: ['lehdet'], tags: ['lehti'], habitats: ['pihat','niityt'] },
]

describe('categories', () => {
  it('Helppo aloittelijalle = beginnerFriendly === true', () => {
    expect(categories.helppo(plants).map((p) => p.id)).toEqual(['beginner','forest','yard'])
  })

  it('Syötävät = edibleParts.length > 0 OR tags includes syötävä', () => {
    expect(categories.syotavat(plants).map((p) => p.id)).toEqual(['beginner','forest','yard'])
  })

  it('Teekasvit = tags includes teekasvi', () => {
    expect(categories.teekasvit(plants).map((p) => p.id)).toEqual(['tea'])
  })

  it('Metsä = habitats includes "metsä"', () => {
    expect(categories.metsa(plants).map((p) => p.id)).toEqual(['forest'])
  })

  it('Piha = habitats includes piha/niitty/pelto', () => {
    expect(categories.piha(plants).map((p) => p.id)).toEqual(['beginner','yard'])
  })

  it('exports human-readable labels for each category', () => {
    expect(categoryLabels.helppo).toBe('Helppo aloittelijalle')
    expect(categoryLabels.syotavat).toBe('Syötävät')
    expect(categoryLabels.teekasvit).toBe('Teekasvit')
    expect(categoryLabels.metsa).toBe('Metsä')
    expect(categoryLabels.piha).toBe('Piha')
  })
})

describe('categories.piha — eksplisiittiset habitat-keywordit', () => {
  const make = (id: string, habitats: string[]): Plant => ({
    ...validPlantInput,
    id,
    habitats,
  })

  it('pellonpiennat matchaa Piha (taivutusmuoto, ei pelkkä `pelto`-substring)', () => {
    expect(categories.piha([make('a', ['pellonpiennat'])])[0]?.id).toBe('a')
  })

  it('pellonpiennar (yksikkö) matchaa Piha', () => {
    expect(categories.piha([make('a', ['pellonpiennar'])])[0]?.id).toBe('a')
  })

  it('pellot (peltojen monikko) matchaa Piha', () => {
    expect(categories.piha([make('a', ['pellot'])])[0]?.id).toBe('a')
  })

  it('nurmikot matchaa Piha', () => {
    expect(categories.piha([make('a', ['nurmikot'])])[0]?.id).toBe('a')
  })

  it('niityt matchaa Piha', () => {
    expect(categories.piha([make('a', ['niityt'])])[0]?.id).toBe('a')
  })

  it('tienvarret matchaa Piha', () => {
    expect(categories.piha([make('a', ['tienvarret'])])[0]?.id).toBe('a')
  })

  it('joutomaa matchaa Piha', () => {
    expect(categories.piha([make('a', ['joutomaa'])])[0]?.id).toBe('a')
  })

  it('vanhat metsät EI matchaa Piha', () => {
    expect(categories.piha([make('a', ['vanhat metsät'])])).toEqual([])
  })

  it('havumetsät EI matchaa Piha', () => {
    expect(categories.piha([make('a', ['havumetsät'])])).toEqual([])
  })

  it('rantaniittyä matchaa Piha (sisältää niit-stem)', () => {
    expect(categories.piha([make('a', ['rantaniityt'])])[0]?.id).toBe('a')
  })

  it('puhtaat vesistöt/rannat ilman piha-keyword EIVÄT matchaa', () => {
    expect(categories.piha([make('a', ['vesistö'])])).toEqual([])
    expect(categories.piha([make('a', ['rantakallio'])])).toEqual([])
    expect(categories.piha([make('a', ['ojanvarret'])])).toEqual([])
  })

  it('case-insensitive: PELLONPIENNAT matchaa', () => {
    expect(categories.piha([make('a', ['PELLONPIENNAT'])])[0]?.id).toBe('a')
  })
})

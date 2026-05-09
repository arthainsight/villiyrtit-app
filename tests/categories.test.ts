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

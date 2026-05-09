import { filterPlants, emptyFilters } from '@/lib/filter'
import { validPlantInput } from './fixtures/plant'
import type { Plant } from '@/data/plant.schema'

const plants: Plant[] = [
  { ...validPlantInput, id: 'a', months: ['kesäkuu','heinäkuu'], difficulty: 'easy', tags: ['syötävä','lehti'], beginnerFriendly: true },
  { ...validPlantInput, id: 'b', months: ['heinäkuu'], difficulty: 'medium', tags: ['teekasvi'], beginnerFriendly: false },
  { ...validPlantInput, id: 'c', months: ['toukokuu','kesäkuu'], difficulty: 'easy', tags: ['marja','syötävä'], beginnerFriendly: true },
]

describe('filterPlants', () => {
  it('returns all plants for empty filters', () => {
    expect(filterPlants(plants, emptyFilters()).length).toBe(plants.length)
  })

  it('filters by months (intersection)', () => {
    expect(filterPlants(plants, { ...emptyFilters(), months: ['heinäkuu'] }).map((p) => p.id)).toEqual(['a','b'])
  })

  it('filters by multiple months (union of months matches)', () => {
    expect(filterPlants(plants, { ...emptyFilters(), months: ['toukokuu','heinäkuu'] }).map((p) => p.id).sort()).toEqual(['a','b','c'])
  })

  it('filters by difficulty', () => {
    expect(filterPlants(plants, { ...emptyFilters(), difficulty: ['easy'] }).map((p) => p.id)).toEqual(['a','c'])
  })

  it('filters by tags (all selected tags must be present, AND across tags)', () => {
    expect(filterPlants(plants, { ...emptyFilters(), tags: ['syötävä'] }).map((p) => p.id)).toEqual(['a','c'])
    expect(filterPlants(plants, { ...emptyFilters(), tags: ['syötävä','lehti'] }).map((p) => p.id)).toEqual(['a'])
  })

  it('filters by beginnerFriendlyOnly', () => {
    expect(filterPlants(plants, { ...emptyFilters(), beginnerFriendlyOnly: true }).map((p) => p.id)).toEqual(['a','c'])
  })

  it('combines all filter dimensions with AND logic', () => {
    expect(
      filterPlants(plants, {
        months: ['kesäkuu'],
        difficulty: ['easy'],
        tags: ['syötävä'],
        beginnerFriendlyOnly: true,
      }).map((p) => p.id)
    ).toEqual(['a','c'])
  })

  it('returns empty array when AND combination matches nothing', () => {
    expect(
      filterPlants(plants, {
        months: ['heinäkuu'],
        difficulty: ['easy'],
        tags: ['teekasvi'],
        beginnerFriendlyOnly: true,
      })
    ).toEqual([])
  })
})

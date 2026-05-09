import type { Plant, Month, Difficulty, Tag } from '@/data/plant.schema'

export type Filters = {
  months: Month[]
  difficulty: Difficulty[]
  tags: Tag[]
  beginnerFriendlyOnly: boolean
}

export const emptyFilters = (): Filters => ({
  months: [],
  difficulty: [],
  tags: [],
  beginnerFriendlyOnly: false,
})

export function filterPlants(plants: Plant[], f: Filters): Plant[] {
  return plants.filter((p) => {
    if (f.beginnerFriendlyOnly && !p.beginnerFriendly) return false
    if (f.months.length > 0 && !p.months.some((m) => f.months.includes(m))) return false
    if (f.difficulty.length > 0 && !f.difficulty.includes(p.difficulty)) return false
    if (f.tags.length > 0 && !f.tags.every((t) => p.tags.includes(t))) return false
    return true
  })
}

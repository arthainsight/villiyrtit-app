import type { Plant } from '@/data/plant.schema'

const lower = (s: string) => s.toLocaleLowerCase('fi-FI')

export function searchPlants(plants: Plant[], query: string): Plant[] {
  const q = lower(query.trim())
  if (!q) return plants
  return plants.filter((p) => {
    const haystack = [
      p.finnishName,
      p.latinName,
      p.shortDescription,
      ...p.tags,
      ...p.uses,
    ].map(lower).join('|')
    return haystack.includes(q)
  })
}

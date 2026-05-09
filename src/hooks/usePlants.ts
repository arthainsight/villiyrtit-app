import { useMemo } from 'react'
import { useAppStore } from '@/store/useAppStore'
import { plants } from '@/data/plants'
import { searchPlants } from '@/lib/search'
import { filterPlants } from '@/lib/filter'
import { currentMonth } from '@/lib/months'
import type { Plant } from '@/data/plant.schema'

const FEATURED_CAP = 6

const sortFeatured = (a: Plant, b: Plant): number => {
  if (a.beginnerFriendly !== b.beginnerFriendly) return a.beginnerFriendly ? -1 : 1
  const order: Record<Plant['difficulty'], number> = { easy: 0, medium: 1, hard: 2 }
  if (a.difficulty !== b.difficulty) return order[a.difficulty] - order[b.difficulty]
  return a.finnishName.localeCompare(b.finnishName, 'fi-FI')
}

export function usePlants(now: Date = new Date()) {
  const searchQuery = useAppStore((s) => s.searchQuery)
  const filters = useAppStore((s) => s.filters)

  return useMemo(() => {
    const month = currentMonth(now)
    const filtered = searchPlants(filterPlants(plants, filters), searchQuery)
    const featured = plants
      .filter((p) => p.months.includes(month))
      .sort(sortFeatured)
      .slice(0, FEATURED_CAP)
    return { filtered, featured, currentMonth: month }
  }, [searchQuery, filters, now])
}

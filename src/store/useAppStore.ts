import { create } from 'zustand'
import type { Month, Difficulty, Tag } from '@/data/plant.schema'
import { emptyFilters, type Filters } from '@/lib/filter'

type AppState = {
  searchQuery: string
  setSearchQuery: (q: string) => void

  filters: Filters
  toggleMonth: (m: Month) => void
  toggleDifficulty: (d: Difficulty) => void
  toggleTag: (t: Tag) => void
  setBeginnerOnly: (v: boolean) => void
  resetFilters: () => void
}

const toggle = <T>(arr: T[], item: T): T[] =>
  arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item]

export const useAppStore = create<AppState>((set) => ({
  searchQuery: '',
  setSearchQuery: (q) => set({ searchQuery: q }),

  filters: emptyFilters(),
  toggleMonth: (m) => set((s) => ({ filters: { ...s.filters, months: toggle(s.filters.months, m) } })),
  toggleDifficulty: (d) => set((s) => ({ filters: { ...s.filters, difficulty: toggle(s.filters.difficulty, d) } })),
  toggleTag: (t) => set((s) => ({ filters: { ...s.filters, tags: toggle(s.filters.tags, t) } })),
  setBeginnerOnly: (v) => set((s) => ({ filters: { ...s.filters, beginnerFriendlyOnly: v } })),
  resetFilters: () => set({ filters: emptyFilters() }),
}))

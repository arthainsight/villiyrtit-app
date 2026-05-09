import { useAppStore } from '@/store/useAppStore'

describe('useAppStore', () => {
  beforeEach(() => {
    useAppStore.getState().resetFilters()
    useAppStore.getState().setSearchQuery('')
  })

  it('starts with empty search and empty filters', () => {
    const s = useAppStore.getState()
    expect(s.searchQuery).toBe('')
    expect(s.filters.months).toEqual([])
    expect(s.filters.difficulty).toEqual([])
    expect(s.filters.tags).toEqual([])
    expect(s.filters.beginnerFriendlyOnly).toBe(false)
  })

  it('sets and clears search query', () => {
    useAppStore.getState().setSearchQuery('nokk')
    expect(useAppStore.getState().searchQuery).toBe('nokk')
    useAppStore.getState().setSearchQuery('')
    expect(useAppStore.getState().searchQuery).toBe('')
  })

  it('toggles a month filter', () => {
    useAppStore.getState().toggleMonth('kesäkuu')
    expect(useAppStore.getState().filters.months).toEqual(['kesäkuu'])
    useAppStore.getState().toggleMonth('heinäkuu')
    expect(useAppStore.getState().filters.months).toEqual(['kesäkuu','heinäkuu'])
    useAppStore.getState().toggleMonth('kesäkuu')
    expect(useAppStore.getState().filters.months).toEqual(['heinäkuu'])
  })

  it('toggles difficulty', () => {
    useAppStore.getState().toggleDifficulty('easy')
    expect(useAppStore.getState().filters.difficulty).toEqual(['easy'])
    useAppStore.getState().toggleDifficulty('easy')
    expect(useAppStore.getState().filters.difficulty).toEqual([])
  })

  it('toggles a tag', () => {
    useAppStore.getState().toggleTag('syötävä')
    expect(useAppStore.getState().filters.tags).toEqual(['syötävä'])
  })

  it('sets beginnerFriendlyOnly', () => {
    useAppStore.getState().setBeginnerOnly(true)
    expect(useAppStore.getState().filters.beginnerFriendlyOnly).toBe(true)
  })

  it('resets filters', () => {
    useAppStore.getState().toggleMonth('kesäkuu')
    useAppStore.getState().setBeginnerOnly(true)
    useAppStore.getState().resetFilters()
    expect(useAppStore.getState().filters.months).toEqual([])
    expect(useAppStore.getState().filters.beginnerFriendlyOnly).toBe(false)
  })

  it('integration: search + filter state can coexist', () => {
    // Verifies the store holds both kinds of state simultaneously without interference.
    // Actual combined filtering happens in usePlants hook (Task 15).
    useAppStore.getState().setSearchQuery('nokk')
    useAppStore.getState().toggleMonth('heinäkuu')
    useAppStore.getState().setBeginnerOnly(true)
    const s = useAppStore.getState()
    expect(s.searchQuery).toBe('nokk')
    expect(s.filters.months).toEqual(['heinäkuu'])
    expect(s.filters.beginnerFriendlyOnly).toBe(true)
  })

  it('does not contain theme state (theme handled by useColorScheme hook in components)', () => {
    const state = useAppStore.getState() as Record<string, unknown>
    expect('theme' in state).toBe(false)
    expect('isDarkMode' in state).toBe(false)
    expect('colorScheme' in state).toBe(false)
  })
})

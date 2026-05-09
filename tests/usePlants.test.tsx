import { renderHook, act } from '@testing-library/react-native'
import { usePlants } from '@/hooks/usePlants'
import { useAppStore } from '@/store/useAppStore'

jest.mock('@/data/plants', () => {
  const { validPlantInput } = require('./fixtures/plant')
  return {
    plants: [
      { ...validPlantInput, id: 'a', months: ['kesäkuu'], difficulty: 'easy', beginnerFriendly: true, finnishName: 'Aurinkokukka', tags: ['syötävä'] },
      { ...validPlantInput, id: 'b', months: ['heinäkuu'], difficulty: 'medium', beginnerFriendly: false, finnishName: 'Beegonia', tags: ['teekasvi'] },
      { ...validPlantInput, id: 'c', months: ['kesäkuu','heinäkuu'], difficulty: 'easy', beginnerFriendly: true, finnishName: 'Cikoria', tags: ['syötävä','marja'] },
    ],
  }
})

describe('usePlants', () => {
  beforeEach(() => {
    useAppStore.getState().resetFilters()
    useAppStore.getState().setSearchQuery('')
  })

  it('returns all plants when no filter or search', () => {
    const { result } = renderHook(() => usePlants(new Date('2026-06-15T12:00:00')))
    expect(result.current.filtered.map((p) => p.id).sort()).toEqual(['a','b','c'])
  })

  it('returns featured for currentMonth (kesäkuu)', () => {
    const { result } = renderHook(() => usePlants(new Date('2026-06-15T12:00:00')))
    expect(result.current.featured.map((p) => p.id).sort()).toEqual(['a','c'])
    expect(result.current.currentMonth).toBe('kesäkuu')
  })

  it('combines search query with filtered output', () => {
    const { result, rerender } = renderHook(() => usePlants(new Date('2026-06-15T12:00:00')))
    act(() => useAppStore.getState().setSearchQuery('aur'))
    rerender(undefined)
    expect(result.current.filtered.map((p) => p.id)).toEqual(['a'])
  })

  it('combines filters AND search', () => {
    const { result, rerender } = renderHook(() => usePlants(new Date('2026-07-15T12:00:00')))
    act(() => {
      useAppStore.getState().toggleMonth('heinäkuu')
      useAppStore.getState().setBeginnerOnly(true)
    })
    rerender(undefined)
    // heinäkuu plants: b, c. beginnerFriendly only: c.
    expect(result.current.filtered.map((p) => p.id)).toEqual(['c'])
  })

  it('caps featured at 6', () => {
    const { result } = renderHook(() => usePlants(new Date('2026-06-15T12:00:00')))
    expect(result.current.featured.length).toBeLessThanOrEqual(6)
  })

  it('orders featured: beginnerFriendly first, then easy difficulty, then finnishName', () => {
    const { result } = renderHook(() => usePlants(new Date('2026-06-15T12:00:00')))
    // a and c both beginnerFriendly=true and difficulty=easy.
    // Order should be by finnishName: Aurinkokukka before Cikoria.
    expect(result.current.featured.map((p) => p.id)).toEqual(['a','c'])
  })

  it('returns no featured when currentMonth has no matches', () => {
    const { result } = renderHook(() => usePlants(new Date('2026-12-15T12:00:00')))
    expect(result.current.featured).toEqual([])
    expect(result.current.currentMonth).toBe('joulukuu')
  })
})

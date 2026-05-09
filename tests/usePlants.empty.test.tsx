import { renderHook } from '@testing-library/react-native'
import { usePlants } from '@/hooks/usePlants'

// This file isolates the empty-plants case in its own module so its
// jest.mock('@/data/plants', () => ({ plants: [] })) doesn't conflict with the
// populated mock used in usePlants.test.tsx.
jest.mock('@/data/plants', () => ({ plants: [] }))

describe('usePlants — empty plants array', () => {
  it('returns empty filtered and featured for empty plants array', () => {
    const { result } = renderHook(() => usePlants(new Date('2026-06-15T12:00:00')))
    expect(result.current.filtered).toEqual([])
    expect(result.current.featured).toEqual([])
    expect(result.current.currentMonth).toBe('kesäkuu')
  })
})

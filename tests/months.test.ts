import { allMonths, currentMonth, capitalize, monthIndex } from '@/lib/months'

describe('months', () => {
  it('lists 12 finnish months in order', () => {
    expect(allMonths).toEqual([
      'tammikuu','helmikuu','maaliskuu','huhtikuu','toukokuu','kesäkuu',
      'heinäkuu','elokuu','syyskuu','lokakuu','marraskuu','joulukuu',
    ])
  })

  it('returns finnish month for a Date (timezone-resilient via local time)', () => {
    expect(currentMonth(new Date('2026-05-09T12:00:00'))).toBe('toukokuu')
    expect(currentMonth(new Date('2026-07-15T12:00:00'))).toBe('heinäkuu')
    expect(currentMonth(new Date('2026-12-31T12:00:00'))).toBe('joulukuu')
    expect(currentMonth(new Date('2026-01-01T12:00:00'))).toBe('tammikuu')
  })

  it('capitalizes a finnish month', () => {
    expect(capitalize('toukokuu')).toBe('Toukokuu')
    expect(capitalize('kesäkuu')).toBe('Kesäkuu')
  })

  it('returns the index for a finnish month', () => {
    expect(monthIndex('tammikuu')).toBe(0)
    expect(monthIndex('joulukuu')).toBe(11)
    expect(monthIndex('kesäkuu')).toBe(5)
  })
})

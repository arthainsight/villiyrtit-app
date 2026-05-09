import type { Month } from '@/data/plant.schema'

export const allMonths: Month[] = [
  'tammikuu','helmikuu','maaliskuu','huhtikuu','toukokuu','kesäkuu',
  'heinäkuu','elokuu','syyskuu','lokakuu','marraskuu','joulukuu',
]

export function currentMonth(now: Date = new Date()): Month {
  const idx = now.getMonth()
  const month = allMonths[idx]
  if (!month) throw new Error(`unreachable: month index ${idx}`)
  return month
}

export function capitalize(month: Month): string {
  return month.charAt(0).toUpperCase() + month.slice(1)
}

export function monthIndex(month: Month): number {
  return allMonths.indexOf(month)
}

import type { Plant } from '@/data/plant.schema'

const hasHabitat = (plant: Plant, needle: string): boolean =>
  plant.habitats.some((h) => h.toLocaleLowerCase('fi-FI').includes(needle))

const hasAnyHabitat = (plant: Plant, needles: readonly string[]): boolean =>
  needles.some((n) => hasHabitat(plant, n))

// Piha-kategoria: pihat, niityt, pellot, tienvarret, joutomaat ja niiden taivutukset.
// Eksplisiittinen lista taivutusmuotoineen — Finnish-substring-haku ei tunnista
// taivutusta, joten kantamuoto + yleisimmät taivutukset listataan suoraan.
const PIHA_KEYWORDS = [
  'piha', 'pihat', 'pihapiiri',
  'nurmi', 'nurmikot',
  'niitty', 'niityt', 'niit',
  'pelto', 'pellot', 'pellonpiennar', 'pellonpiennat', 'pientareet',
  'tienvarret',
  'joutomaa', 'joutomaat',
] as const

export const categories = {
  helppo: (plants: Plant[]) => plants.filter((p) => p.beginnerFriendly),
  syotavat: (plants: Plant[]) =>
    plants.filter((p) => p.edibleParts.length > 0 || p.tags.includes('syötävä')),
  teekasvit: (plants: Plant[]) => plants.filter((p) => p.tags.includes('teekasvi')),
  metsa: (plants: Plant[]) => plants.filter((p) => hasHabitat(p, 'metsä')),
  piha: (plants: Plant[]) => plants.filter((p) => hasAnyHabitat(p, PIHA_KEYWORDS)),
}

export const categoryLabels = {
  helppo: 'Helppo aloittelijalle',
  syotavat: 'Syötävät',
  teekasvit: 'Teekasvit',
  metsa: 'Metsä',
  piha: 'Piha',
} as const

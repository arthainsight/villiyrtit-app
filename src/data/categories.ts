import type { Plant } from '@/data/plant.schema'

const hasHabitat = (plant: Plant, needle: string): boolean =>
  plant.habitats.some((h) => h.toLocaleLowerCase('fi-FI').includes(needle))

export const categories = {
  helppo: (plants: Plant[]) => plants.filter((p) => p.beginnerFriendly),
  syotavat: (plants: Plant[]) =>
    plants.filter((p) => p.edibleParts.length > 0 || p.tags.includes('syötävä')),
  teekasvit: (plants: Plant[]) => plants.filter((p) => p.tags.includes('teekasvi')),
  metsa: (plants: Plant[]) => plants.filter((p) => hasHabitat(p, 'metsä')),
  piha: (plants: Plant[]) =>
    plants.filter((p) => hasHabitat(p, 'piha') || hasHabitat(p, 'niit') || hasHabitat(p, 'pelto')),
}

export const categoryLabels = {
  helppo: 'Helppo aloittelijalle',
  syotavat: 'Syötävät',
  teekasvit: 'Teekasvit',
  metsa: 'Metsä',
  piha: 'Piha',
} as const

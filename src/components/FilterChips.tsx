import { Pressable, ScrollView, Text } from 'react-native'
import { useAppStore } from '@/store/useAppStore'

type Chip =
  | { kind: 'month'; label: string; value: 'kesäkuu' | 'heinäkuu' }
  | { kind: 'difficulty'; label: string; value: 'easy' }
  | { kind: 'tag'; label: string; value: 'syötävä' | 'teekasvi' }
  | { kind: 'beginner'; label: string }

const chips: Chip[] = [
  { kind: 'month', label: 'Kesäkuu', value: 'kesäkuu' },
  { kind: 'month', label: 'Heinäkuu', value: 'heinäkuu' },
  { kind: 'difficulty', label: 'Helppo', value: 'easy' },
  { kind: 'tag', label: 'Syötävä', value: 'syötävä' },
  { kind: 'tag', label: 'Teekasvi', value: 'teekasvi' },
  { kind: 'beginner', label: 'Aloittelijalle' },
]

export function FilterChips() {
  const filters = useAppStore((s) => s.filters)
  const toggleMonth = useAppStore((s) => s.toggleMonth)
  const toggleDifficulty = useAppStore((s) => s.toggleDifficulty)
  const toggleTag = useAppStore((s) => s.toggleTag)
  const setBeginnerOnly = useAppStore((s) => s.setBeginnerOnly)
  const resetFilters = useAppStore((s) => s.resetFilters)

  const isActive = (chip: Chip): boolean => {
    if (chip.kind === 'month') return filters.months.includes(chip.value)
    if (chip.kind === 'difficulty') return filters.difficulty.includes(chip.value)
    if (chip.kind === 'tag') return filters.tags.includes(chip.value)
    return filters.beginnerFriendlyOnly
  }

  const onPress = (chip: Chip) => {
    if (chip.kind === 'month') toggleMonth(chip.value)
    else if (chip.kind === 'difficulty') toggleDifficulty(chip.value)
    else if (chip.kind === 'tag') toggleTag(chip.value)
    else setBeginnerOnly(!filters.beginnerFriendlyOnly)
  }

  const anyActive =
    filters.months.length > 0 ||
    filters.difficulty.length > 0 ||
    filters.tags.length > 0 ||
    filters.beginnerFriendlyOnly

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}
    >
      {chips.map((chip) => {
        const active = isActive(chip)
        return (
          <Pressable
            key={chip.kind + ('value' in chip ? chip.value : '')}
            onPress={() => onPress(chip)}
            accessibilityRole="button"
            accessibilityLabel={`Suodata: ${chip.label}`}
            accessibilityState={{ selected: active }}
            className={`h-10 px-4 rounded-btn justify-center ${active ? 'bg-primary dark:bg-primary-dark' : 'bg-surface dark:bg-surface-dark border border-zinc-200 dark:border-zinc-800'}`}
          >
            <Text
              className={`font-sans text-[14px] ${active ? 'text-canvas dark:text-canvas-dark' : 'text-ink dark:text-ink-dark'}`}
            >
              {chip.label}
            </Text>
          </Pressable>
        )
      })}
      {anyActive && (
        <Pressable
          onPress={resetFilters}
          accessibilityRole="button"
          accessibilityLabel="Tyhjennä kaikki suodattimet"
          className="h-10 px-4 rounded-btn justify-center"
        >
          <Text className="font-sans text-[14px] text-accent dark:text-accent-dark underline">Tyhjennä</Text>
        </Pressable>
      )}
    </ScrollView>
  )
}

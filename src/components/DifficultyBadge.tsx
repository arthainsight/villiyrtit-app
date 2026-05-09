import { Text, View } from 'react-native'
import type { Difficulty } from '@/data/plant.schema'

const labels: Record<Difficulty, string> = {
  easy: 'Helppo',
  medium: 'Keskitaso',
  hard: 'Vaikea',
}

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  return (
    <View
      accessibilityRole="text"
      accessibilityLabel={`Vaikeustaso: ${labels[difficulty]}`}
      className="px-3 h-7 rounded-btn justify-center bg-canvas dark:bg-surface-dark border border-zinc-200 dark:border-zinc-800"
    >
      <Text className="font-sans text-[12px] text-ink dark:text-ink-dark">
        {labels[difficulty]}
      </Text>
    </View>
  )
}

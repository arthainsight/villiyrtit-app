import { ScrollView, Text, View } from 'react-native'
import type { Plant } from '@/data/plant.schema'
import { PlantCard } from './PlantCard'

export function CategoryRow({ title, plants }: { title: string; plants: Plant[] }) {
  if (plants.length === 0) return null
  return (
    <View className="gap-3">
      <Text
        className="font-sansSemibold text-[18px] text-ink dark:text-ink-dark px-5"
        accessibilityRole="header"
      >
        {title}
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}
      >
        {plants.map((plant) => (
          <PlantCard key={plant.id} plant={plant} variant="featured" />
        ))}
      </ScrollView>
    </View>
  )
}

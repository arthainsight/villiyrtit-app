import { FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { usePlants } from '@/hooks/usePlants'
import { PlantCard } from '@/components/PlantCard'
import { EmptyState } from '@/components/EmptyState'

export default function PlantList() {
  const { filtered } = usePlants()

  return (
    <SafeAreaView className="flex-1 bg-canvas dark:bg-canvas-dark" edges={['bottom']}>
      <FlatList
        data={filtered}
        keyExtractor={(p) => p.id}
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 32, gap: 16 }}
        renderItem={({ item }) => <PlantCard plant={item} />}
        ListEmptyComponent={<EmptyState message="Listalla ei ole kasveja." />}
      />
    </SafeAreaView>
  )
}

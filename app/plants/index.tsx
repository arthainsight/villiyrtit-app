import { FlatList, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { usePlants } from '@/hooks/usePlants'
import { useAppStore } from '@/store/useAppStore'
import { SearchBar } from '@/components/SearchBar'
import { FilterChips } from '@/components/FilterChips'
import { PlantCard } from '@/components/PlantCard'
import { EmptyState } from '@/components/EmptyState'

export default function PlantList() {
  const { filtered } = usePlants()
  const resetFilters = useAppStore((s) => s.resetFilters)
  const setSearchQuery = useAppStore((s) => s.setSearchQuery)

  return (
    <SafeAreaView className="flex-1 bg-canvas dark:bg-canvas-dark" edges={['bottom']}>
      <View className="px-5 py-3">
        <SearchBar />
      </View>
      <View className="pb-3">
        <FilterChips />
      </View>
      <FlatList
        data={filtered}
        keyExtractor={(p) => p.id}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 32, gap: 16 }}
        renderItem={({ item }) => <PlantCard plant={item} />}
        ListEmptyComponent={
          <EmptyState
            message="Ei tuloksia näillä ehdoilla."
            actionLabel="Tyhjennä filterit"
            onAction={() => {
              resetFilters()
              setSearchQuery('')
            }}
          />
        }
      />
    </SafeAreaView>
  )
}

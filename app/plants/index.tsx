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
  const searchQuery = useAppStore((s) => s.searchQuery)
  const filters = useAppStore((s) => s.filters)
  const resetFilters = useAppStore((s) => s.resetFilters)
  const setSearchQuery = useAppStore((s) => s.setSearchQuery)

  const hasActiveQuery =
    searchQuery.trim().length > 0 ||
    filters.months.length > 0 ||
    filters.difficulty.length > 0 ||
    filters.tags.length > 0 ||
    filters.beginnerFriendlyOnly

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
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 32, gap: 16, flexGrow: 1 }}
        renderItem={({ item }) => <PlantCard plant={item} />}
        ListEmptyComponent={
          hasActiveQuery ? (
            <EmptyState
              message="Ei tuloksia näillä ehdoilla."
              actionLabel="Tyhjennä haku ja filterit"
              onAction={() => {
                resetFilters()
                setSearchQuery('')
              }}
            />
          ) : (
            <EmptyState message="Ei kasveja saatavilla." />
          )
        }
      />
    </SafeAreaView>
  )
}

import { ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useEffect } from 'react'
import { useRouter } from 'expo-router'
import { plants } from '@/data/plants'
import { categories, categoryLabels } from '@/data/categories'
import { capitalize } from '@/lib/months'
import { usePlants } from '@/hooks/usePlants'
import { CategoryRow } from '@/components/CategoryRow'
import { SearchBar } from '@/components/SearchBar'
import { useAppStore } from '@/store/useAppStore'

export default function Home() {
  const router = useRouter()
  const { featured, currentMonth: month } = usePlants()
  const searchQuery = useAppStore((s) => s.searchQuery)

  useEffect(() => {
    if (searchQuery.length > 0) router.push('/plants')
  }, [searchQuery, router])

  return (
    <SafeAreaView className="flex-1 bg-canvas dark:bg-canvas-dark" edges={['top']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        <View className="px-5 pt-2 pb-6 gap-1">
          <Text
            className="font-serif text-[24px] text-ink dark:text-ink-dark leading-[1.3]"
            accessibilityRole="header"
          >
            Mitä luonnosta löytyy {capitalize(month).toLowerCase()}ssa?
          </Text>
          <Text className="font-sans text-[14px] text-muted dark:text-muted-dark">
            {featured.length} kasvia juuri nyt
          </Text>
        </View>
        <View className="px-5 pb-6">
          <SearchBar />
        </View>
        {featured.length > 0 ? (
          <View className="pb-8">
            <CategoryRow title="Juuri nyt" plants={featured} />
          </View>
        ) : (
          <View className="px-5 pb-8">
            <Text className="font-sans text-[14px] text-muted dark:text-muted-dark">
              Tällä kuukaudella ei ole listallamme kasveja — tutustu kuitenkin koko valikoimaan.
            </Text>
          </View>
        )}
        <View className="gap-8">
          <CategoryRow title={categoryLabels.helppo} plants={categories.helppo(plants)} />
          <CategoryRow title={categoryLabels.syotavat} plants={categories.syotavat(plants)} />
          <CategoryRow title={categoryLabels.teekasvit} plants={categories.teekasvit(plants)} />
          <CategoryRow title={categoryLabels.metsa} plants={categories.metsa(plants)} />
          <CategoryRow title={categoryLabels.piha} plants={categories.piha(plants)} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

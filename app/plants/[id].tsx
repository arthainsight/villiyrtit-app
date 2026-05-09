import { ScrollView, Text, View } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useEffect } from 'react'
import { plants } from '@/data/plants'
import { capitalize } from '@/lib/months'
import { PlantHero } from '@/components/PlantHero'
import { DangerCallout } from '@/components/DangerCallout'
import { DifficultyBadge } from '@/components/DifficultyBadge'
import { BeginnerBadge } from '@/components/BeginnerBadge'
import { CollapsibleSection } from '@/components/CollapsibleSection'

export default function PlantDetail() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const router = useRouter()
  const plant = plants.find((p) => p.id === id)

  useEffect(() => {
    if (!plant) router.replace('/+not-found')
  }, [plant, router])

  if (!plant) return null

  const dangerousLookalikes = plant.lookalikes.filter(
    (l) => l.dangerLevel === 'korkea' || l.dangerLevel === 'kuolettava'
  )

  return (
    <ScrollView className="bg-canvas dark:bg-canvas-dark" contentContainerStyle={{ paddingBottom: 48 }}>
      <PlantHero plant={plant} />

      <View className="px-5 pt-5">
        <DangerCallout severity="warn">{plant.safetyNote}</DangerCallout>
      </View>

      <View className="flex-row gap-2 px-5 py-4">
        <DifficultyBadge difficulty={plant.difficulty} />
        {plant.beginnerFriendly && <BeginnerBadge />}
      </View>

      <View className="px-5 pb-2">
        <Text className="font-sans text-[14px] text-muted dark:text-muted-dark">
          Löytyy: {plant.months.map((m) => capitalize(m)).join(', ')}
        </Text>
      </View>

      <View className="px-5 py-3">
        <Text className="font-sans text-[16px] text-ink dark:text-ink-dark leading-[1.5]">
          {plant.description}
        </Text>
      </View>

      <View className="px-5">
        <CollapsibleSection title="Tunnistus" defaultOpen>
          <Text className="font-sans text-[16px] text-ink dark:text-ink-dark leading-[1.5]">
            {plant.shortDescription}
          </Text>
        </CollapsibleSection>

        <CollapsibleSection title="Syötävät osat" defaultOpen>
          <View className="gap-1">
            {plant.edibleParts.map((part) => (
              <Text key={part} className="font-sans text-[16px] text-ink dark:text-ink-dark">· {part}</Text>
            ))}
            {plant.edibleParts.length === 0 && (
              <Text className="font-sans text-[14px] text-muted dark:text-muted-dark italic">Ei syötäviä osia.</Text>
            )}
          </View>
        </CollapsibleSection>

        <CollapsibleSection title="Käyttötavat">
          <View className="gap-1">
            {plant.uses.map((u) => (
              <Text key={u} className="font-sans text-[16px] text-ink dark:text-ink-dark">· {u}</Text>
            ))}
          </View>
        </CollapsibleSection>

        <CollapsibleSection title="Habitatit">
          <View className="gap-1">
            {plant.habitats.map((h) => (
              <Text key={h} className="font-sans text-[16px] text-ink dark:text-ink-dark">· {h}</Text>
            ))}
          </View>
        </CollapsibleSection>

        <CollapsibleSection title="Varoitukset" defaultOpen={plant.warnings.length > 0}>
          <View className="gap-2">
            {plant.warnings.map((w, i) => (
              <Text key={i} className="font-sans text-[16px] text-ink dark:text-ink-dark leading-[1.5]">· {w}</Text>
            ))}
            {plant.warnings.length === 0 && (
              <Text className="font-sans text-[14px] text-muted dark:text-muted-dark italic">Ei erityisiä varoituksia.</Text>
            )}
          </View>
        </CollapsibleSection>

        <CollapsibleSection title="Vaaralliset näköislajit" defaultOpen={dangerousLookalikes.length > 0}>
          <View className="gap-3">
            {plant.lookalikes.map((l, i) => {
              const isDangerous = l.dangerLevel === 'korkea' || l.dangerLevel === 'kuolettava'
              return (
                <View
                  key={i}
                  className={`p-3 rounded-card ${isDangerous ? 'border-2 border-danger bg-danger/10' : 'bg-surface dark:bg-surface-dark'}`}
                >
                  <Text className="font-sansSemibold text-[16px] text-ink dark:text-ink-dark">
                    {l.name}{' '}
                    <Text className="font-sans text-[12px] text-muted dark:text-muted-dark">({l.dangerLevel})</Text>
                  </Text>
                  <Text className="font-sans text-[14px] text-ink dark:text-ink-dark leading-[1.5] mt-1">
                    {l.howToDifferentiate}
                  </Text>
                </View>
              )
            })}
            {plant.lookalikes.length === 0 && (
              <Text className="font-sans text-[14px] text-muted dark:text-muted-dark italic">Ei tunnettuja näköislajeja.</Text>
            )}
          </View>
        </CollapsibleSection>
      </View>
    </ScrollView>
  )
}

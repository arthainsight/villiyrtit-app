import { Pressable, Text, View } from 'react-native'
import { Image } from 'expo-image'
import { Link } from 'expo-router'
import { AlertTriangle } from 'lucide-react-native'
import type { Plant } from '@/data/plant.schema'
import { imageMap } from '@/data/imageMap'
import { colors } from '@/theme/colors'
import { BeginnerBadge } from './BeginnerBadge'

type Props = {
  plant: Plant
  variant?: 'list' | 'featured'
}

export function PlantCard({ plant, variant = 'list' }: Props) {
  const dangerous = plant.lookalikes.some(
    (l) => l.dangerLevel === 'korkea' || l.dangerLevel === 'kuolettava'
  )
  const widthClass = variant === 'featured' ? 'w-64' : 'w-full'
  const a11yLabel = `${plant.finnishName}${dangerous ? ', sisältää vaarallisen näköislajin' : ''}`

  return (
    <Link href={`/plants/${plant.id}`} asChild>
      <Pressable
        accessibilityRole="link"
        accessibilityLabel={a11yLabel}
        className={`${widthClass} bg-surface dark:bg-surface-dark rounded-card overflow-hidden border border-transparent dark:border-zinc-800 active:scale-[0.98]`}
      >
        <View className="aspect-[4/3] bg-canvas dark:bg-canvas-dark">
          <Image
            source={imageMap[plant.image]}
            style={{ width: '100%', height: '100%' }}
            contentFit="cover"
            placeholder={plant.blurhash}
            transition={200}
          />
          {dangerous && (
            <View
              accessibilityRole="image"
              accessibilityLabel="Vaaroitus: vaarallinen näköislaji"
              className="absolute top-2 right-2 bg-danger rounded-full p-1.5"
            >
              <AlertTriangle size={14} color={colors.light.surface} />
            </View>
          )}
        </View>
        <View className="p-4 gap-1">
          <Text className="font-serif text-[18px] text-ink dark:text-ink-dark">
            {plant.finnishName}
          </Text>
          <Text className="font-sans text-[12px] italic text-muted dark:text-muted-dark">
            {plant.latinName}
          </Text>
          <Text
            className="font-sans text-[14px] text-ink dark:text-ink-dark mt-1"
            numberOfLines={2}
          >
            {plant.shortDescription}
          </Text>
          {plant.beginnerFriendly && (
            <View className="flex-row mt-2">
              <BeginnerBadge />
            </View>
          )}
        </View>
      </Pressable>
    </Link>
  )
}

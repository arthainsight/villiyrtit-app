import { Text, View } from 'react-native'
import { Image } from 'expo-image'
import type { Plant } from '@/data/plant.schema'
import { imageMap } from '@/data/imageMap'

export function PlantHero({ plant }: { plant: Plant }) {
  return (
    <View>
      <View className="aspect-[16/9] bg-canvas dark:bg-canvas-dark">
        <Image
          source={imageMap[plant.image]}
          style={{ width: '100%', height: '100%' }}
          contentFit="cover"
          placeholder={plant.blurhash}
          transition={250}
        />
      </View>
      <View className="px-5 pt-5 gap-1">
        <Text className="font-serifBold text-[32px] text-ink dark:text-ink-dark leading-[1.15]">
          {plant.finnishName}
        </Text>
        <Text className="font-sans text-[14px] italic text-muted dark:text-muted-dark">
          {plant.latinName}
        </Text>
      </View>
      <Text className="px-5 pt-1 font-sans text-[10px] text-muted dark:text-muted-dark">
        {plant.imageCredit} · {plant.imageLicense}
      </Text>
    </View>
  )
}

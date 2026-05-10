import { Link, Stack } from 'expo-router'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function NotFound() {
  return (
    <>
      <Stack.Screen options={{ title: 'Ei löydy' }} />
      <SafeAreaView className="flex-1 bg-canvas dark:bg-canvas-dark">
        <View className="flex-1 items-center justify-center p-5 gap-3">
          <Text className="font-serif text-[24px] text-ink dark:text-ink-dark text-center">
            Sivua ei löytynyt
          </Text>
          <Text className="font-sans text-[14px] text-muted dark:text-muted-dark text-center">
            Tarkista linkki tai palaa etusivulle.
          </Text>
          <Link href="/" accessibilityRole="link" className="mt-4">
            <Text className="font-sansSemibold text-[16px] text-primary dark:text-primary-dark underline">
              Takaisin etusivulle
            </Text>
          </Link>
        </View>
      </SafeAreaView>
    </>
  )
}

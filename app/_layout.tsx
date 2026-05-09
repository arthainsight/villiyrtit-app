import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useColorScheme } from 'react-native'
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter'
import { Lora_400Regular, Lora_700Bold } from '@expo-google-fonts/lora'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import { colors } from '@/theme/colors'
import '../global.css'

SplashScreen.preventAutoHideAsync().catch(() => {})

export default function RootLayout() {
  const scheme = useColorScheme()
  const [loaded, error] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Lora_400Regular,
    Lora_700Bold,
  })

  useEffect(() => {
    if (loaded || error) SplashScreen.hideAsync().catch(() => {})
  }, [loaded, error])

  if (!loaded && !error) return null

  const palette = scheme === 'dark' ? colors.dark : colors.light

  return (
    <>
      <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: 'transparent' },
          headerTitleStyle: { fontFamily: 'Lora_400Regular', fontSize: 18 },
          headerShadowVisible: false,
          contentStyle: { backgroundColor: palette.canvas },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="plants/index" options={{ title: 'Kasvit' }} />
        <Stack.Screen name="plants/[id]" options={{ title: '' }} />
      </Stack>
    </>
  )
}

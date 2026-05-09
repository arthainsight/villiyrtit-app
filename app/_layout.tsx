import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useColorScheme } from 'react-native'
import '../global.css'

export default function RootLayout() {
  const scheme = useColorScheme()
  return (
    <>
      <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: 'transparent' },
          headerTitleStyle: { fontWeight: '500' },
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="plants/index" options={{ title: 'Kasvit' }} />
        <Stack.Screen name="plants/[id]" options={{ title: '' }} />
      </Stack>
    </>
  )
}

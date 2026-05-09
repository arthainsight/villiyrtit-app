import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

export default function RootLayout() {
  return (
    <>
      <StatusBar style="auto" />
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

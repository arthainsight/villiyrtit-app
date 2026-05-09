import { Link, Stack } from 'expo-router'
import { Text, View } from 'react-native'

export default function NotFound() {
  return (
    <>
      <Stack.Screen options={{ title: 'Ei löydy' }} />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 }}>
        <Text>Sivua ei löytynyt.</Text>
        <Link href="/" style={{ marginTop: 12 }}>
          <Text style={{ color: '#4A6741' }}>Takaisin etusivulle</Text>
        </Link>
      </View>
    </>
  )
}

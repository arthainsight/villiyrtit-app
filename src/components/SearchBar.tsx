import { TextInput, View } from 'react-native'
import { Search } from 'lucide-react-native'
import { useEffect, useState } from 'react'
import { useAppStore } from '@/store/useAppStore'

export function SearchBar() {
  const setSearchQuery = useAppStore((s) => s.setSearchQuery)
  const [local, setLocal] = useState('')

  useEffect(() => {
    const id = setTimeout(() => setSearchQuery(local), 200)
    return () => clearTimeout(id)
  }, [local, setSearchQuery])

  return (
    <View className="flex-row items-center bg-surface dark:bg-surface-dark rounded-btn px-3 h-12 gap-2 border border-zinc-200 dark:border-zinc-800">
      <Search size={18} color="#5A6151" />
      <TextInput
        className="flex-1 text-[16px] font-sans text-ink dark:text-ink-dark"
        placeholder="Etsi kasvia..."
        placeholderTextColor="#5A6151"
        value={local}
        onChangeText={setLocal}
        autoCorrect={false}
        autoCapitalize="none"
        accessibilityLabel="Hakukenttä"
      />
    </View>
  )
}

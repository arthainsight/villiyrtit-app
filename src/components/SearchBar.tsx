import { TextInput, View, useColorScheme } from 'react-native'
import { Search } from 'lucide-react-native'
import { useAppStore } from '@/store/useAppStore'
import { colors } from '@/theme/colors'

export function SearchBar() {
  const searchQuery = useAppStore((s) => s.searchQuery)
  const setSearchQuery = useAppStore((s) => s.setSearchQuery)
  const scheme = useColorScheme()
  const mutedColor = scheme === 'dark' ? colors.dark.muted : colors.light.muted

  return (
    <View className="flex-row items-center bg-surface dark:bg-surface-dark rounded-btn px-3 h-12 gap-2 border border-zinc-200 dark:border-zinc-800">
      <Search size={18} color={mutedColor} />
      <TextInput
        className="flex-1 text-[16px] font-sans text-ink dark:text-ink-dark"
        placeholder="Etsi kasvia..."
        placeholderTextColor={mutedColor}
        value={searchQuery}
        onChangeText={setSearchQuery}
        autoCorrect={false}
        autoCapitalize="none"
        accessibilityLabel="Hakukenttä"
      />
    </View>
  )
}

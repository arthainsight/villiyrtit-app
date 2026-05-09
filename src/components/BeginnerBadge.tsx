import { Text, View, useColorScheme } from 'react-native'
import { Sparkles } from 'lucide-react-native'
import { colors } from '@/theme/colors'

export function BeginnerBadge() {
  const scheme = useColorScheme()
  const iconColor = scheme === 'dark' ? colors.dark.primary : colors.light.primary
  return (
    <View
      accessibilityRole="text"
      accessibilityLabel="Aloittelijaystävällinen kasvi"
      className="flex-row items-center gap-1 px-3 h-7 rounded-btn bg-primary/15 dark:bg-primary-dark/15"
    >
      <Sparkles size={12} color={iconColor} />
      <Text className="font-sans text-[12px] text-primary dark:text-primary-dark">
        Aloittelijalle
      </Text>
    </View>
  )
}

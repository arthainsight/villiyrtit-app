import { Pressable, Text, View, useColorScheme } from 'react-native'
import { Leaf } from 'lucide-react-native'
import { colors } from '@/theme/colors'

type Props = {
  message: string
  actionLabel?: string
  onAction?: () => void
}

export function EmptyState({ message, actionLabel, onAction }: Props) {
  const scheme = useColorScheme()
  const iconColor = scheme === 'dark' ? colors.dark.muted : colors.light.muted
  return (
    <View className="flex-1 items-center justify-center gap-4 p-10">
      <Leaf size={48} color={iconColor} />
      <Text className="font-sans text-[16px] text-muted dark:text-muted-dark text-center">
        {message}
      </Text>
      {actionLabel && onAction && (
        <Pressable
          onPress={onAction}
          accessibilityRole="button"
          accessibilityLabel={actionLabel}
          className="px-5 h-touch rounded-btn bg-primary dark:bg-primary-dark justify-center"
        >
          <Text className="font-sansSemibold text-[14px] text-canvas dark:text-canvas-dark">
            {actionLabel}
          </Text>
        </Pressable>
      )}
    </View>
  )
}

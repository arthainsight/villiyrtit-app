import { Pressable, Text, View } from 'react-native'
import { ChevronDown } from 'lucide-react-native'
import { useState, type ReactNode } from 'react'
import Animated, { LinearTransition } from 'react-native-reanimated'
import { colors } from '@/theme/colors'

type Props = {
  title: string
  defaultOpen?: boolean
  children: ReactNode
}

export function CollapsibleSection({ title, defaultOpen = false, children }: Props) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <Animated.View
      layout={LinearTransition.duration(180)}
      className="border-b border-zinc-200 dark:border-zinc-800"
    >
      <Pressable
        onPress={() => setOpen((o) => !o)}
        accessibilityRole="button"
        accessibilityLabel={`${title}${open ? ', avoinna' : ', suljettu'}`}
        accessibilityState={{ expanded: open }}
        className="flex-row items-center justify-between py-4 min-h-touch"
      >
        <Text className="font-sansSemibold text-[18px] text-ink dark:text-ink-dark">
          {title}
        </Text>
        <View style={{ transform: [{ rotate: open ? '180deg' : '0deg' }] }}>
          <ChevronDown size={20} color={colors.light.muted} />
        </View>
      </Pressable>
      {open && <View className="pb-4">{children}</View>}
    </Animated.View>
  )
}

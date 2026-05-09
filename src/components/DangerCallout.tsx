import { Text, View } from 'react-native'
import { AlertTriangle } from 'lucide-react-native'
import { colors } from '@/theme/colors'

type Severity = 'warn' | 'danger'

export function DangerCallout({
  children,
  severity = 'warn',
}: {
  children: string
  severity?: Severity
}) {
  const tint = severity === 'danger' ? colors.light.danger : colors.light.warn
  // Both danger (#C8341B) and warn (#D4A012) are identical in light/dark palette,
  // so we always read from light. The 14% alpha hex suffix tints the background.
  return (
    <View
      accessibilityRole="alert"
      accessibilityLabel={
        severity === 'danger' ? `Varoitus: ${children}` : `Huomio: ${children}`
      }
      className="flex-row gap-3 p-4 rounded-card border-2"
      style={{ borderColor: tint, backgroundColor: tint + '14' }}
    >
      <AlertTriangle size={20} color={tint} />
      <Text className="flex-1 font-sans text-[14px] text-ink dark:text-ink-dark leading-[1.5]">
        {children}
      </Text>
    </View>
  )
}

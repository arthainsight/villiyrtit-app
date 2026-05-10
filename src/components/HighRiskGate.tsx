import { Pressable, Text, View } from 'react-native'
import { ShieldAlert } from 'lucide-react-native'
import { colors } from '@/theme/colors'

type Props = {
  onAcknowledge: () => void
}

export function HighRiskGate({ onAcknowledge }: Props) {
  const tint = colors.light.danger
  return (
    <View
      accessibilityRole="alert"
      accessibilityLabel="Korkean riskin kasvi: lue varoitukset ennen jatkamista"
      className="mx-5 mt-4 p-4 rounded-card border-2"
      style={{ borderColor: tint, backgroundColor: tint + '14' }}
    >
      <View className="flex-row items-start gap-3 mb-3">
        <ShieldAlert size={24} color={tint} />
        <View className="flex-1">
          <Text className="font-sansSemibold text-[16px] text-ink dark:text-ink-dark mb-1">
            Korkean riskin kasvi
          </Text>
          <Text className="font-sans text-[14px] text-ink dark:text-ink-dark leading-[1.5]">
            Tämän kasvin tunnistus vaatii kokemusta tai sillä on hengenvaarallinen näköislaji. Lue safetyNote ja näköislaji-tiedot huolellisesti ennen kuin keräät kasvia.
          </Text>
        </View>
      </View>
      <Pressable
        onPress={onAcknowledge}
        accessibilityRole="button"
        accessibilityLabel="Olen lukenut ja ymmärrän riskit"
        className="h-touch rounded-btn justify-center items-center active:opacity-80"
        style={{ backgroundColor: tint }}
      >
        <Text className="font-sansSemibold text-[14px] text-canvas">
          Olen lukenut ja ymmärrän riskit
        </Text>
      </Pressable>
    </View>
  )
}

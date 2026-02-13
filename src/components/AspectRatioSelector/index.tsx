import type { AspectRatio } from '@/types/generation'
import { Text, View } from '@tarojs/components'
import './index.scss'

interface AspectRatioSelectorProps {
  value: AspectRatio
  onChange: (ratio: AspectRatio) => void
}

const RATIOS: { key: AspectRatio, label: string, desc: string, w: number, h: number }[] = [
  { key: '16:9', label: '16:9', desc: '红包封面', w: 48, h: 27 },
  { key: '1:1', label: '1:1', desc: '正方形', w: 36, h: 36 },
  { key: '9:16', label: '9:16', desc: '壁纸', w: 27, h: 48 },
]

export default function AspectRatioSelector({ value, onChange }: AspectRatioSelectorProps) {
  return (
    <View className="aspect-ratio-selector">
      {RATIOS.map(ratio => (
        <View
          key={ratio.key}
          className={`aspect-ratio-selector__item ${value === ratio.key ? 'aspect-ratio-selector__item--active' : ''}`}
          onClick={() => onChange(ratio.key)}
        >
          <View
            className="aspect-ratio-selector__preview"
            style={{ width: `${ratio.w}px`, height: `${ratio.h}px` }}
          />
          <Text className="aspect-ratio-selector__label">{ratio.label}</Text>
          <Text className="aspect-ratio-selector__desc">{ratio.desc}</Text>
        </View>
      ))}
    </View>
  )
}

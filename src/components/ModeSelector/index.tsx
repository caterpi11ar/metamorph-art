import type { GenerationMode } from '@/types/generation'
import { Text, View } from '@tarojs/components'
import './index.scss'

interface ModeSelectorProps {
  value: GenerationMode
  onChange: (mode: GenerationMode) => void
}

const MODES: { key: GenerationMode, label: string }[] = [
  { key: 'text2img', label: '文字生图' },
  { key: 'img2img', label: '文图生图' },
]

export default function ModeSelector({ value, onChange }: ModeSelectorProps) {
  return (
    <View className="mode-selector">
      {MODES.map(mode => (
        <View
          key={mode.key}
          className={`mode-selector__item ${value === mode.key ? 'mode-selector__item--active' : ''}`}
          onClick={() => onChange(mode.key)}
        >
          <Text className="mode-selector__label">{mode.label}</Text>
        </View>
      ))}
      <View
        className="mode-selector__indicator"
        style={{ transform: `translateX(${value === 'text2img' ? '0' : '100%'})` }}
      />
    </View>
  )
}

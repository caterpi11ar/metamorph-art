import { Slider, Text, View } from '@tarojs/components'
import './index.scss'

interface SliderControlProps {
  label: string
  value: number
  min?: number
  max?: number
  step?: number
  suffix?: string
  onChange: (value: number) => void
}

export default function SliderControl({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  suffix = '',
  onChange,
}: SliderControlProps) {
  return (
    <View className="slider-control">
      <View className="slider-control__header">
        <Text className="slider-control__label">{label}</Text>
        <Text className="slider-control__value">
          {value}
          {suffix}
        </Text>
      </View>
      <Slider
        className="slider-control__slider"
        value={value}
        min={min}
        max={max}
        step={step}
        activeColor="#007AFF"
        backgroundColor="#E5E5EA"
        blockSize={24}
        onChange={e => onChange(e.detail.value)}
      />
    </View>
  )
}

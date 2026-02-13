import { Text, View } from '@tarojs/components'
import './index.scss'

interface SegmentedControlProps<T extends string> {
  label: string
  options: { key: T, label: string }[]
  value: T
  onChange: (value: T) => void
}

export default function SegmentedControl<T extends string>({ label, options, value, onChange }: SegmentedControlProps<T>) {
  const activeIndex = options.findIndex(o => o.key === value)
  const count = options.length

  return (
    <View className="segmented-control">
      <Text className="segmented-control__label">{label}</Text>
      <View className="segmented-control__track">
        {options.map(opt => (
          <View
            key={opt.key}
            className={`segmented-control__option ${value === opt.key ? 'segmented-control__option--active' : ''}`}
            onClick={() => onChange(opt.key)}
          >
            <Text className="segmented-control__option-text">{opt.label}</Text>
          </View>
        ))}
        <View
          className="segmented-control__indicator"
          style={{
            width: `calc(${100 / count}% - 4px)`,
            transform: `translateX(calc(${activeIndex * 100}% + ${activeIndex * 4}px))`,
          }}
        />
      </View>
    </View>
  )
}

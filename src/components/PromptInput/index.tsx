import { Text, Textarea, View } from '@tarojs/components'
import { useState } from 'react'
import './index.scss'

interface PromptInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  maxLength?: number
}

export default function PromptInput({
  value,
  onChange,
  placeholder = '描述你想要的画面，例如：一条金龙盘旋在红色背景上，周围环绕着祥云和鞭炮...',
  maxLength = 500,
}: PromptInputProps) {
  const [focused, setFocused] = useState(false)

  return (
    <View className={`prompt-input ${focused ? 'prompt-input--focused' : ''}`}>
      <Textarea
        className="prompt-input__textarea"
        value={value}
        onInput={e => onChange(e.detail.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        placeholderClass="prompt-input__placeholder"
        maxlength={maxLength}
        autoHeight
      />
      <View className="prompt-input__footer">
        <Text className="prompt-input__count">
          {value.length}
          /
          {maxLength}
        </Text>
      </View>
    </View>
  )
}

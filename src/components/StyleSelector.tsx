import type { ImageStyleConfig } from '../constants/image_styles'
import { Text, View } from '@tarojs/components'
import React, { useEffect, useState } from 'react'
import { IMAGE_STYLES } from '../constants/image_styles'
import './StyleSelector.scss'

interface StyleSelectorProps {
  onStyleSelect?: (style: ImageStyleConfig) => void
  selectedStyle?: string | null
}

const StyleSelector: React.FC<StyleSelectorProps> = ({
  onStyleSelect,
  selectedStyle: externalSelectedStyle,
}) => {
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null)

  useEffect(() => {
    if (externalSelectedStyle !== undefined) {
      setSelectedStyle(externalSelectedStyle)
    }
  }, [externalSelectedStyle])

  const handleStyleSelect = (style: ImageStyleConfig) => {
    setSelectedStyle(style.id)
    onStyleSelect && onStyleSelect(style)
  }

  return (
    <View className="style-selector">
      <Text className="style-selector__title">选择艺术风格</Text>
      <View className="style-selector__grid">
        {IMAGE_STYLES.map(style => (
          <View
            key={style.id}
            className={`style-selector__card ${selectedStyle === style.id ? 'style-selector__card--selected' : ''}`}
            onClick={() => handleStyleSelect(style)}
          >
            <View
              className="style-selector__swatch"
              style={{ backgroundColor: style.color }}
            />
            <Text className="style-selector__name">{style.name}</Text>
            <Text className="style-selector__desc">{style.description}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}

export default StyleSelector

import type { ImageStyleConfig } from '../constants/image_styles'
import { Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
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
    Taro.showToast({
      title: `已选择${style.name}`,
      icon: 'success',
      duration: 1000,
    })
  }

  return (
    <View className="style-selector">
      <Text className="selector-title">选择艺术风格</Text>
      <View className="style-grid">
        {IMAGE_STYLES.map(style => (
          <View
            key={style.id}
            className={`style-card ${selectedStyle === style.id ? 'selected' : ''}`}
            style={{
              backgroundColor: selectedStyle === style.id
                ? style.color
                : `${style.color}20`,
              borderColor: style.color,
            }}
            onClick={() => handleStyleSelect(style)}
          >
            <View
              className="style-icon"
              style={{
                color: selectedStyle === style.id ? 'white' : 'inherit',
              }}
            >
              {style.icon}
            </View>
            <Text
              className="style-name"
              style={{
                color: selectedStyle === style.id ? 'white' : '$text-primary',
              }}
            >
              {style.name}
            </Text>
            <Text
              className="style-description"
              style={{
                color: selectedStyle === style.id ? 'rgba(255,255,255,0.8)' : '$text-secondary',
              }}
            >
              {style.description}
            </Text>
          </View>
        ))}
      </View>
    </View>
  )
}

export default StyleSelector

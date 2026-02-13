import { previewImage } from '@/utils/image'
import { Image, Text, View } from '@tarojs/components'
import { useState } from 'react'
import './index.scss'

interface ImageCardProps {
  src: string
  title?: string
  subtitle?: string
  onClick?: () => void
}

export default function ImageCard({ src, title, subtitle, onClick }: ImageCardProps) {
  const [loaded, setLoaded] = useState(false)

  const handleClick = () => {
    if (onClick) {
      onClick()
    }
    else {
      previewImage(src)
    }
  }

  return (
    <View className="image-card" onClick={handleClick}>
      <View className="image-card__img-wrap">
        {!loaded && <View className="image-card__skeleton" />}
        <Image
          className={`image-card__img ${loaded ? 'image-card__img--loaded' : ''}`}
          src={src}
          mode="aspectFill"
          lazyLoad
          onLoad={() => setLoaded(true)}
        />
      </View>
      {(title || subtitle) && (
        <View className="image-card__info">
          {title && <Text className="image-card__title">{title}</Text>}
          {subtitle && <Text className="image-card__subtitle">{subtitle}</Text>}
        </View>
      )}
    </View>
  )
}

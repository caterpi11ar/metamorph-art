import { Text, View } from '@tarojs/components'
import './index.scss'

interface EmptyStateProps {
  title: string
  description?: string
  color?: string
}

export default function EmptyState({ title, description, color = '#E5E5EA' }: EmptyStateProps) {
  return (
    <View className="empty-state">
      <View className="empty-state__graphic">
        <View
          className="empty-state__circle"
          style={{ backgroundColor: color, opacity: 0.15 }}
        />
        <View
          className="empty-state__dot"
          style={{ backgroundColor: color, opacity: 0.3 }}
        />
      </View>
      <Text className="empty-state__title">{title}</Text>
      {description && <Text className="empty-state__desc">{description}</Text>}
    </View>
  )
}

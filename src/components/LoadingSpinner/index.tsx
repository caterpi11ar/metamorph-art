import { View } from '@tarojs/components'
import './index.scss'

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large'
}

export default function LoadingSpinner({ size = 'medium' }: LoadingSpinnerProps) {
  return (
    <View className={`loading-spinner loading-spinner--${size}`}>
      <View className="loading-spinner__ring" />
    </View>
  )
}

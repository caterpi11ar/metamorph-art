import LoadingSpinner from '@/components/LoadingSpinner'
import { Text, View } from '@tarojs/components'
import './index.scss'

interface GenerationProgressProps {
  progress: number
  status: string
  onCancel?: () => void
}

export default function GenerationProgress({ progress, status, onCancel }: GenerationProgressProps) {
  const getStatusText = () => {
    if (status === 'pending')
      return '排队中...'
    if (status === 'processing')
      return '生成中...'
    return '处理中...'
  }

  return (
    <View className="gen-progress">
      <LoadingSpinner size="large" />
      <Text className="gen-progress__text">{getStatusText()}</Text>
      <View className="gen-progress__bar-wrap">
        <View
          className="gen-progress__bar"
          style={{ width: `${Math.max(progress, 5)}%` }}
        />
        <View className="gen-progress__bar-shine" />
      </View>
      <Text className="gen-progress__percent">
        {progress}
        %
      </Text>
      <Text className="gen-progress__hint">AI 正在为你创作，请耐心等待</Text>
      {onCancel && (
        <View className="gen-progress__cancel" onClick={onCancel}>
          <Text className="gen-progress__cancel-text">取消</Text>
        </View>
      )}
    </View>
  )
}

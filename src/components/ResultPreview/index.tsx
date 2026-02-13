import type { GenerationTask } from '@/types/generation'
import { previewImage, saveToAlbum } from '@/utils/image'
import { Image, Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'

interface ResultPreviewProps {
  task: GenerationTask
  onRegenerate: () => void
  onBackToInput: () => void
}

export default function ResultPreview({ task, onBackToInput }: ResultPreviewProps) {
  const isSuccess = task.status === 'completed' && task.resultUrl
  const isFailed = task.status === 'failed'

  const handleSave = async () => {
    if (task.resultUrl) {
      await saveToAlbum(task.resultUrl)
    }
  }

  const handleShare = () => {
    Taro.showShareMenu({ withShareTicket: true })
  }

  const handlePreview = () => {
    if (task.resultUrl) {
      previewImage(task.resultUrl)
    }
  }

  return (
    <View className="result-preview">
      {isSuccess && (
        <>
          <View className="result-preview__image-wrap" onClick={handlePreview}>
            <Image
              className="result-preview__image"
              src={task.resultUrl!}
              mode="widthFix"
            />
          </View>
          <View className="result-preview__actions">
            <View className="result-preview__action" onClick={handleSave}>
              <Text className="result-preview__action-text">保存到相册</Text>
            </View>
            <View className="result-preview__action-divider" />
            <View className="result-preview__action" onClick={handleShare}>
              <Text className="result-preview__action-text">分享</Text>
            </View>
          </View>
        </>
      )}
      {isFailed && (
        <View className="result-preview__error">
          <View className="result-preview__error-graphic">
            <View className="result-preview__error-circle" />
          </View>
          <Text className="result-preview__error-title">生成失败</Text>
          <Text className="result-preview__error-msg">{task.errorMessage || '请稍后重试'}</Text>
        </View>
      )}
      <View className="result-preview__bottom">
        <View className="result-preview__btn result-preview__btn--secondary" onClick={onBackToInput}>
          <Text>返回修改</Text>
        </View>
      </View>
    </View>
  )
}

import type { ImageStyleConfig } from '../../constants/image_styles'
import { Button, Image, Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import React, { useState } from 'react'
import StyleSelector from '../../components/StyleSelector'
import './index.scss'

const WorkspacePage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedStyle, setSelectedStyle] = useState<ImageStyleConfig | null>(null)
  const [processedImage, setProcessedImage] = useState<string | null>(null)
  const [isStyleSelectorVisible, setIsStyleSelectorVisible] = useState(false)

  const handleImageClick = () => {
    Taro.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFilePaths = res.tempFilePaths
        setSelectedImage(tempFilePaths[0])
        setProcessedImage(null)
        setSelectedStyle(null)
        setIsStyleSelectorVisible(true)
      },
    })
  }

  const handleStyleSelect = (style: ImageStyleConfig) => {
    setSelectedStyle(style)
  }

  const processImage = () => {
    if (!selectedImage || !selectedStyle) {
      Taro.showToast({
        title: '请选择图片和风格',
        icon: 'none',
      })
      return
    }

    Taro.showLoading({ title: '正在处理...' })
    setTimeout(() => {
      Taro.hideLoading()
      Taro.showToast({
        title: `${selectedStyle.name}处理完成`,
        icon: 'success',
      })
      // 模拟生成处理后的图片
      setProcessedImage(selectedImage)
    }, 2000)
  }

  // 保存图片
  const handleSaveImage = async () => {
    if (!processedImage) {
      Taro.showToast({
        title: '请先处理图片',
        icon: 'none',
      })
      return
    }

    try {
      await Taro.saveImageToPhotosAlbum({
        filePath: processedImage,
      })
      Taro.showToast({
        title: '保存成功',
        icon: 'success',
      })
    }
    catch (error) {
      console.error(error)
      Taro.showToast({
        title: '保存失败',
        icon: 'none',
      })
    }
  }

  // 分享图片
  const handleShareImage = async () => {
    if (!processedImage) {
      Taro.showToast({
        title: '请先处理图片',
        icon: 'none',
      })
      return
    }

    try {
      await Taro.shareFileMessage({
        filePath: processedImage,
      })
    }
    catch (error) {
      console.error(error)
      Taro.showToast({
        title: '分享失败',
        icon: 'none',
      })
    }
  }

  return (
    <View className="workspace-container">
      <View
        className={`image-section ${selectedImage ? 'has-image' : ''}`}
        onClick={handleImageClick}
      >
        <Image
          src={processedImage || selectedImage || ''}
          className="workspace-image"
          mode="aspectFill"
        />
        {!selectedImage && (
          <View className="image-overlay">
            <View className="upload-hint">点击选择图片</View>
          </View>
        )}
      </View>

      {isStyleSelectorVisible && (
        <StyleSelector
          onStyleSelect={handleStyleSelect}
          selectedStyle={selectedStyle?.id}
        />
      )}

      {selectedImage && selectedStyle && !processedImage && (
        <View className="action-buttons">
          <Button
            className="process-button material-button"
            onClick={processImage}
          >
            <View className="button-content">
              <Text className="button-icon">✨</Text>
              处理图片
            </View>
          </Button>
        </View>
      )}

      {processedImage && (
        <View className="action-buttons">
          <Button
            className="save-button material-button"
            onClick={handleSaveImage}
          >
            <View className="button-content">
              <Text className="button-icon">💾</Text>
              保存
            </View>
          </Button>
          <Button
            className="share-button material-button"
            onClick={handleShareImage}
          >
            <View className="button-content">
              <Text className="button-icon">🔗</Text>
              分享
            </View>
          </Button>
        </View>
      )}
    </View>
  )
}

export default WorkspacePage

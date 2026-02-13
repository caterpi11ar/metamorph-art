import { chooseImage } from '@/utils/image'
import { Image, Text, View } from '@tarojs/components'
import './index.scss'

interface ReferenceImagePickerProps {
  imagePath: string
  onSelect: (path: string) => void
  onClear: () => void
}

export default function ReferenceImagePicker({ imagePath, onSelect, onClear }: ReferenceImagePickerProps) {
  const handlePick = async () => {
    const path = await chooseImage()
    if (path) {
      onSelect(path)
    }
  }

  return (
    <View className="ref-image-picker">
      <Text className="ref-image-picker__label">参考图片</Text>
      {imagePath
        ? (
            <View className="ref-image-picker__preview">
              <Image
                className="ref-image-picker__image"
                src={imagePath}
                mode="aspectFill"
              />
              <View className="ref-image-picker__remove" onClick={onClear}>
                <Text className="ref-image-picker__remove-text">移除</Text>
              </View>
            </View>
          )
        : (
            <View className="ref-image-picker__upload" onClick={handlePick}>
              <Text className="ref-image-picker__upload-text">点击上传参考图片</Text>
            </View>
          )}
    </View>
  )
}

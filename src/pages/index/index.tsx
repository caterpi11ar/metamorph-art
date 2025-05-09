import { Button, Text, View } from '@tarojs/components'
import { chooseImage, useLoad } from '@tarojs/taro'
import './index.scss'

export default function Index() {
  useLoad(() => {
    console.log('Page loaded.')
  })

  const handleChooseImage = async () => {
    try {
      const res = await chooseImage({
        count: 9, // 最多可以选择的图片张数
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      })
      console.log('选择的图片路径:', res.tempFilePaths)
      // 这里可以将选择的图片路径传递给图像 AI 工具进行处理
    }
    catch (error) {
      console.error('选择图片失败:', error)
    }
  }

  return (
    <View className="index">
      <Text>metamorph-art</Text>
      <Button onClick={handleChooseImage}>选择图片</Button>
    </View>
  )
}

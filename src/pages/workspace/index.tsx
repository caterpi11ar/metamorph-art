import { Text, View } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.scss'

export default function WorkSpace() {
  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View>
      <Text>workSpace</Text>
    </View>
  )
}

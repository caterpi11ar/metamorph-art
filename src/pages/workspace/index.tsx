import { Text, View } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.scss'

export default function WorkSpace() {
  useLoad(() => {
    console.log('Workspace page loaded.')
  })

  return (
    <View>
      <Text>工作区</Text>
    </View>
  )
}

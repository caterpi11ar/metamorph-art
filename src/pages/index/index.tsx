import { Text, View } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.scss'

export default function Index() {
  useLoad(() => {
    console.log('Home page loaded.')
  })

  return (
    <View>
      <Text>首页</Text>
    </View>
  )
}

import { Text, View } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.scss'

export default function Profile() {
  useLoad(() => {
    console.log('Profile page loaded.')
  })

  return (
    <View>
      <Text>我的</Text>
    </View>
  )
}

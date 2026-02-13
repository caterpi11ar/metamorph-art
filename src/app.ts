import type { PropsWithChildren } from 'react'
import { useUserStore } from '@/store/user'
import { setPendingInviteCode } from '@/utils/storage'
import { useLaunch } from '@tarojs/taro'

import './app.scss'

function App({ children }: PropsWithChildren) {
  useLaunch((options) => {
    console.log('App launched.')

    // Restore user state from storage
    useUserStore.getState().init()

    // Parse invite code from launch options
    const inviteCode = options?.query?.inviteCode
    if (inviteCode) {
      console.log('Received invite code:', inviteCode)
      setPendingInviteCode(inviteCode)
    }
  })

  return children
}

export default App

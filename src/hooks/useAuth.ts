import { useUserStore } from '@/store/user'
import Taro from '@tarojs/taro'

export function useAuth() {
  const { isLoggedIn, login, loading } = useUserStore()

  const ensureLogin = async (inviteCode?: string): Promise<boolean> => {
    if (isLoggedIn)
      return true

    try {
      await login(inviteCode)
      return true
    }
    catch (error) {
      console.error('Login failed:', error)
      Taro.showToast({ title: '登录失败，请重试', icon: 'none' })
      return false
    }
  }

  return {
    isLoggedIn,
    loading,
    ensureLogin,
  }
}

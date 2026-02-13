import { useGenerationStore } from '@/store/generation'
import { useUserStore } from '@/store/user'
import Taro from '@tarojs/taro'
import { useAuth } from './useAuth'

export function useGeneration() {
  const { ensureLogin } = useAuth()
  const credits = useUserStore(s => s.credits)
  const refreshCredits = useUserStore(s => s.refreshCredits)
  const store = useGenerationStore()

  const generate = async () => {
    const loggedIn = await ensureLogin()
    if (!loggedIn)
      return

    if (!store.prompt.trim()) {
      Taro.showToast({ title: '请输入创作描述', icon: 'none' })
      return
    }

    if (store.mode === 'img2img' && !store.referenceImageUrl) {
      Taro.showToast({ title: '请上传参考图片', icon: 'none' })
      return
    }

    const cost = store.getCreditsCost()
    if (credits && credits.balance < cost) {
      Taro.showToast({ title: '积分不足，请获取更多积分', icon: 'none' })
      return
    }

    try {
      await store.submitGeneration()
      refreshCredits()
    }
    catch (error: any) {
      Taro.showToast({ title: error.message || '生成失败', icon: 'none' })
    }
  }

  return {
    ...store,
    generate,
  }
}

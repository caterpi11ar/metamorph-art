import type { User, UserCredits } from '@/types/user'
import * as authApi from '@/api/auth'
import * as creditsApi from '@/api/credits'
import { getToken, removeToken, setToken } from '@/utils/storage'
import Taro from '@tarojs/taro'
import { create } from 'zustand'

interface UserState {
  user: User | null
  credits: UserCredits | null
  token: string | null
  isLoggedIn: boolean
  loading: boolean

  init: () => void
  login: (inviteCode?: string) => Promise<void>
  logout: () => void
  refreshCredits: () => Promise<void>
  dailyCheckin: () => Promise<boolean>
  claimShareReward: () => Promise<boolean>
  claimAdReward: () => Promise<boolean>
}

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  credits: null,
  token: null,
  isLoggedIn: false,
  loading: false,

  init: () => {
    const token = getToken()
    if (token) {
      set({ token, isLoggedIn: true })
      authApi.getUserInfo()
        .then(user => set({ user }))
        .catch(() => {
          removeToken()
          set({ token: null, isLoggedIn: false, user: null, credits: null })
        })
      authApi.getUserCredits()
        .then(credits => set({ credits }))
        .catch(console.error)
    }
  },

  login: async (inviteCode?: string) => {
    set({ loading: true })
    try {
      const result = await authApi.login(inviteCode)
      setToken(result.token)
      set({
        token: result.token,
        user: result.user,
        credits: result.credits,
        isLoggedIn: true,
        loading: false,
      })
      if (result.isNewUser) {
        Taro.showToast({ title: '注册成功，赠送3次生成机会！', icon: 'none', duration: 2000 })
      }
    }
    catch (error) {
      set({ loading: false })
      throw error
    }
  },

  logout: () => {
    removeToken()
    set({
      user: null,
      credits: null,
      token: null,
      isLoggedIn: false,
    })
  },

  refreshCredits: async () => {
    if (!get().isLoggedIn)
      return
    try {
      const credits = await authApi.getUserCredits()
      set({ credits })
    }
    catch (error) {
      console.error('Failed to refresh credits:', error)
    }
  },

  dailyCheckin: async () => {
    try {
      const credits = await creditsApi.dailyCheckin()
      set({ credits })
      Taro.showToast({ title: '签到成功 +1', icon: 'success' })
      return true
    }
    catch (error: any) {
      Taro.showToast({ title: error.message || '签到失败', icon: 'none' })
      return false
    }
  },

  claimShareReward: async () => {
    try {
      const credits = await creditsApi.claimShareReward()
      set({ credits })
      Taro.showToast({ title: '分享奖励 +1', icon: 'success' })
      return true
    }
    catch (error: any) {
      Taro.showToast({ title: error.message || '领取失败', icon: 'none' })
      return false
    }
  },

  claimAdReward: async () => {
    try {
      const credits = await creditsApi.claimAdReward()
      set({ credits })
      Taro.showToast({ title: '广告奖励 +1', icon: 'success' })
      return true
    }
    catch (error: any) {
      Taro.showToast({ title: error.message || '领取失败', icon: 'none' })
      return false
    }
  },
}))

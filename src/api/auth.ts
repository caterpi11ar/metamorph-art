import type { LoginResult, User, UserCredits } from '@/types/user'
import Taro from '@tarojs/taro'
import { get, post } from './index'

export async function login(inviteCode?: string): Promise<LoginResult> {
  const { code } = await Taro.login()
  return post<LoginResult>('/auth/login', { code, inviteCode })
}

export function getUserInfo(): Promise<User> {
  return get<User>('/auth/user')
}

export function getUserCredits(): Promise<UserCredits> {
  return get<UserCredits>('/auth/credits')
}

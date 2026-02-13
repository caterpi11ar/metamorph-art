import Taro from '@tarojs/taro'

const TOKEN_KEY = 'token'
const INVITE_CODE_KEY = 'pendingInviteCode'

export function getToken(): string {
  return Taro.getStorageSync(TOKEN_KEY) || ''
}

export function setToken(token: string): void {
  Taro.setStorageSync(TOKEN_KEY, token)
}

export function removeToken(): void {
  Taro.removeStorageSync(TOKEN_KEY)
}

export function getPendingInviteCode(): string {
  return Taro.getStorageSync(INVITE_CODE_KEY) || ''
}

export function setPendingInviteCode(code: string): void {
  Taro.setStorageSync(INVITE_CODE_KEY, code)
}

export function removePendingInviteCode(): void {
  Taro.removeStorageSync(INVITE_CODE_KEY)
}

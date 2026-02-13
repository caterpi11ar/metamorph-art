export interface User {
  id: string
  openId: string
  nickname: string
  avatarUrl: string
  inviteCode: string
  createdAt: string
}

export interface UserCredits {
  balance: number
  totalEarned: number
  totalUsed: number
  dailyCheckedIn: boolean
  dailyShareCount: number
  dailyShareLimit: number
  dailyAdCount: number
  dailyAdLimit: number
}

export interface LoginResult {
  token: string
  user: User
  credits: UserCredits
  isNewUser: boolean
}

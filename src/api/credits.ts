import type { UserCredits } from '@/types/user'
import { post } from './index'

export function dailyCheckin(): Promise<UserCredits> {
  return post<UserCredits>('/credits/checkin')
}

export function claimShareReward(): Promise<UserCredits> {
  return post<UserCredits>('/credits/share-reward')
}

export function claimAdReward(): Promise<UserCredits> {
  return post<UserCredits>('/credits/ad-reward')
}

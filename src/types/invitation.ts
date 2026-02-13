export interface InvitationRecord {
  id: string
  inviteeNickname: string
  inviteeAvatarUrl: string
  creditsEarned: number
  createdAt: string
}

export interface InvitationStats {
  totalInvited: number
  totalCreditsEarned: number
  maxInvitations: number
  inviteCode: string
}

import type { PaginatedResponse } from '@/types/api'
import type { InvitationRecord, InvitationStats } from '@/types/invitation'
import { get } from './index'

export function getInvitationStats(): Promise<InvitationStats> {
  return get<InvitationStats>('/invitation/stats')
}

export function getInvitationRecords(page = 1, pageSize = 20): Promise<PaginatedResponse<InvitationRecord>> {
  return get<PaginatedResponse<InvitationRecord>>('/invitation/records', { page, pageSize })
}

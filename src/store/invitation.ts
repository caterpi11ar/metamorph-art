import type { InvitationRecord, InvitationStats } from '@/types/invitation'
import * as invitationApi from '@/api/invitation'
import { create } from 'zustand'

interface InvitationState {
  stats: InvitationStats | null
  records: InvitationRecord[]
  recordsPage: number
  recordsHasMore: boolean
  loading: boolean

  loadStats: () => Promise<void>
  loadRecords: (refresh?: boolean) => Promise<void>
}

export const useInvitationStore = create<InvitationState>((set, get) => ({
  stats: null,
  records: [],
  recordsPage: 1,
  recordsHasMore: true,
  loading: false,

  loadStats: async () => {
    try {
      const stats = await invitationApi.getInvitationStats()
      set({ stats })
    }
    catch (error) {
      console.error('Failed to load invitation stats:', error)
    }
  },

  loadRecords: async (refresh = false) => {
    const page = refresh ? 1 : get().recordsPage
    set({ loading: true })
    try {
      const result = await invitationApi.getInvitationRecords(page)
      set(state => ({
        records: refresh ? result.list : [...state.records, ...result.list],
        recordsPage: page + 1,
        recordsHasMore: result.hasMore,
        loading: false,
      }))
    }
    catch (error) {
      console.error('Failed to load invitation records:', error)
      set({ loading: false })
    }
  },
}))

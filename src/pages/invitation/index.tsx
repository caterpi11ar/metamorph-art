import EmptyState from '@/components/EmptyState'
import LoadingSpinner from '@/components/LoadingSpinner'
import { useInvitationStore } from '@/store/invitation'
import { useUserStore } from '@/store/user'
import { formatRelativeTime } from '@/utils/format'
import { Image, Text, View } from '@tarojs/components'
import Taro, { useLoad, useShareAppMessage } from '@tarojs/taro'
import './index.scss'

export default function InvitationPage() {
  const { stats, records, loading, loadStats, loadRecords, recordsHasMore } = useInvitationStore()
  const user = useUserStore(s => s.user)

  useLoad(() => {
    loadStats()
    loadRecords(true)
  })

  useShareAppMessage(() => ({
    title: `我在用 MetamorphArt 制作 AI 红包封面，邀请你一起来！`,
    path: `/pages/index/index?inviteCode=${user?.inviteCode || ''}`,
  }))

  const handleCopyCode = () => {
    if (stats?.inviteCode) {
      Taro.setClipboardData({
        data: stats.inviteCode,
        success: () => Taro.showToast({ title: '邀请码已复制', icon: 'success' }),
      })
    }
  }

  const handleShare = () => {
    Taro.showShareMenu({ withShareTicket: true })
  }

  const handleLoadMore = () => {
    if (recordsHasMore && !loading) {
      loadRecords()
    }
  }

  return (
    <View className="invitation">
      {/* Invite Code Card (prominent) */}
      <View className="invitation__code-card">
        <Text className="invitation__code-label">我的邀请码</Text>
        <Text className="invitation__code-text">{stats?.inviteCode || '------'}</Text>
        <View className="invitation__code-actions">
          <View className="invitation__code-btn" onClick={handleCopyCode}>
            <Text className="invitation__code-btn-text">复制</Text>
          </View>
          <View className="invitation__code-btn invitation__code-btn--primary" onClick={handleShare}>
            <Text className="invitation__code-btn-text">分享给好友</Text>
          </View>
        </View>
      </View>

      {/* Stats */}
      <View className="invitation__stats">
        <View className="invitation__stat">
          <Text className="invitation__stat-num">{stats?.totalInvited || 0}</Text>
          <Text className="invitation__stat-label">已邀请</Text>
        </View>
        <View className="invitation__stat">
          <Text className="invitation__stat-num">{stats?.totalCreditsEarned || 0}</Text>
          <Text className="invitation__stat-label">获得积分</Text>
        </View>
        <View className="invitation__stat">
          <Text className="invitation__stat-num">{stats?.maxInvitations || 500}</Text>
          <Text className="invitation__stat-label">上限</Text>
        </View>
      </View>

      {/* Rules */}
      <View className="invitation__rules">
        <Text className="invitation__rules-text">邀请好友注册你获 5 次，好友获 3 次，最多邀 500 人</Text>
      </View>

      {/* Records */}
      <View className="invitation__records">
        <Text className="invitation__records-title">邀请记录</Text>
        {records.length === 0 && !loading
          ? <EmptyState title="暂无邀请记录" description="快去邀请好友吧" color="#007AFF" />
          : (
              <>
                {records.map(record => (
                  <View key={record.id} className="invitation__record-item">
                    <Image
                      className="invitation__record-avatar"
                      src={record.inviteeAvatarUrl}
                      mode="aspectFill"
                    />
                    <View className="invitation__record-info">
                      <Text className="invitation__record-name">{record.inviteeNickname}</Text>
                      <Text className="invitation__record-time">{formatRelativeTime(record.createdAt)}</Text>
                    </View>
                    <Text className="invitation__record-credits">
                      +
                      {record.creditsEarned}
                    </Text>
                  </View>
                ))}
                {loading && <LoadingSpinner size="small" />}
                {recordsHasMore && !loading && (
                  <View className="invitation__load-more" onClick={handleLoadMore}>
                    <Text className="invitation__load-more-text">加载更多</Text>
                  </View>
                )}
              </>
            )}
      </View>
    </View>
  )
}

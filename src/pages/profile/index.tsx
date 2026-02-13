import { useAuth } from '@/hooks/useAuth'
import { useUserStore } from '@/store/user'
import { Image, Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'

const QUICK_ACTIONS = [
  { id: 'history', name: '我的作品', url: '/pages/history/index' },
  { id: 'invite', name: '邀请中心', url: '/pages/invitation/index' },
  { id: 'checkin', name: '每日签到', url: '/pages/checkin/index' },
  { id: 'ad', name: '看广告得积分', action: 'ad' },
]

const MENU_ITEMS = [
  { id: 'about', name: '关于 MetamorphArt' },
  { id: 'feedback', name: '意见反馈' },
  { id: 'privacy', name: '隐私政策' },
  { id: 'agreement', name: '用户协议' },
]

export default function Profile() {
  const { user, credits, isLoggedIn, logout, claimAdReward } = useUserStore()
  const { ensureLogin } = useAuth()

  const handleLogin = async () => {
    await ensureLogin()
  }

  const handleLogout = () => {
    Taro.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          logout()
          Taro.showToast({ title: '已退出登录', icon: 'none' })
        }
      },
    })
  }

  const handleAction = (item: typeof QUICK_ACTIONS[0]) => {
    if (item.action === 'ad') {
      if (!isLoggedIn) {
        Taro.showToast({ title: '请先登录', icon: 'none' })
        return
      }
      claimAdReward()
      return
    }
    if (item.url) {
      Taro.navigateTo({ url: item.url })
    }
  }

  return (
    <View className="profile">
      {/* User Info Card */}
      <View className="profile__user-card">
        <Image
          className="profile__avatar"
          src={user?.avatarUrl || 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI9FhqmIp4UibYRfuMBfGFKZJhK0mPwkYWsGp1oFDzg2WXScHrKjMicILMIQo4ibBSZSEz1eOQ/0'}
          mode="aspectFill"
        />
        <View className="profile__user-info">
          <Text className="profile__nickname">{user?.nickname || '未登录'}</Text>
          {isLoggedIn && user?.inviteCode && (
            <Text className="profile__invite-code">
              邀请码：
              {user.inviteCode}
            </Text>
          )}
        </View>
        {!isLoggedIn
          ? (
              <View className="profile__login-btn" onClick={handleLogin}>
                <Text>微信登录</Text>
              </View>
            )
          : (
              <View className="profile__logout-btn" onClick={handleLogout}>
                <Text>退出</Text>
              </View>
            )}
      </View>

      {/* Credits Card */}
      {isLoggedIn && credits && (
        <View className="profile__credits-card">
          <View className="profile__credits-main">
            <Text className="profile__credits-value">{credits.balance}</Text>
            <Text className="profile__credits-label">剩余生成次数</Text>
          </View>
          <View className="profile__credits-divider" />
          <View className="profile__credits-stats">
            <View className="profile__credits-stat">
              <Text className="profile__credits-stat-num">{credits.totalEarned}</Text>
              <Text className="profile__credits-stat-label">总获取</Text>
            </View>
            <View className="profile__credits-stat">
              <Text className="profile__credits-stat-num">{credits.totalUsed}</Text>
              <Text className="profile__credits-stat-label">已使用</Text>
            </View>
          </View>
        </View>
      )}

      {/* Quick Actions */}
      <View className="profile__actions">
        {QUICK_ACTIONS.map(item => (
          <View
            key={item.id}
            className="profile__action-item"
            onClick={() => handleAction(item)}
          >
            <Text className="profile__action-name">{item.name}</Text>
            <View className="profile__action-arrow" />
          </View>
        ))}
      </View>

      {/* Menu */}
      <View className="profile__menu">
        {MENU_ITEMS.map(item => (
          <View key={item.id} className="profile__menu-item">
            <Text className="profile__menu-name">{item.name}</Text>
            <View className="profile__menu-arrow" />
          </View>
        ))}
      </View>
    </View>
  )
}

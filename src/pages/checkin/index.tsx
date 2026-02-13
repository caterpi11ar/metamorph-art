import { useUserStore } from '@/store/user'
import { Text, View } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import { useState } from 'react'
import './index.scss'

const WEEKDAYS = ['一', '二', '三', '四', '五', '六', '日']

const REWARD_LIST = [
  { name: '每日签到', value: '+1 次' },
  { name: '邀请好友', value: '+5 次' },
  { name: '分享作品', value: '+1 次' },
  { name: '观看广告', value: '+1 次' },
]

export default function CheckinPage() {
  const { credits, dailyCheckin, isLoggedIn } = useUserStore()
  const [checkinDays] = useState(() => {
    const today = new Date()
    const dayOfWeek = today.getDay() || 7
    return Array.from({ length: 7 }, (_, i) => ({
      day: WEEKDAYS[i],
      checked: i < dayOfWeek - 1,
      isToday: i === dayOfWeek - 1,
    }))
  })

  useLoad(() => {
    console.log('Checkin page loaded.')
  })

  const handleCheckin = async () => {
    if (!isLoggedIn)
      return
    await dailyCheckin()
  }

  const todayChecked = credits?.dailyCheckedIn || false

  return (
    <View className="checkin">
      {/* Status Card */}
      <View className="checkin__status-card">
        <Text className="checkin__status-title">
          {todayChecked ? '今日已签到' : '今日未签到'}
        </Text>
        <Text className="checkin__status-desc">
          每日签到可获得 1 次免费生成机会
        </Text>
      </View>

      {/* Weekly Calendar */}
      <View className="checkin__calendar">
        <Text className="checkin__calendar-title">本周签到</Text>
        <View className="checkin__week">
          {checkinDays.map((d, i) => (
            <View
              key={i}
              className={`checkin__day ${d.checked ? 'checkin__day--checked' : ''} ${d.isToday ? 'checkin__day--today' : ''}`}
            >
              <Text className="checkin__day-label">{d.day}</Text>
              <View className="checkin__day-circle">
                <Text className="checkin__day-text">
                  {d.checked || (d.isToday && todayChecked) ? '✓' : d.isToday ? '今' : ''}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Checkin Button */}
      <View
        className={`checkin__btn ${todayChecked ? 'checkin__btn--done' : ''}`}
        onClick={handleCheckin}
      >
        <Text className="checkin__btn-text">
          {todayChecked ? '明天再来' : '立即签到 +1'}
        </Text>
      </View>

      {/* Rewards Info */}
      <View className="checkin__rewards">
        <Text className="checkin__rewards-title">积分获取方式</Text>
        {REWARD_LIST.map(item => (
          <View key={item.name} className="checkin__reward-item">
            <Text className="checkin__reward-name">{item.name}</Text>
            <Text className="checkin__reward-value">{item.value}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}

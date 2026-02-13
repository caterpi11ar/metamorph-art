import { useUserStore } from '@/store/user'
import { Swiper, SwiperItem, Text, View } from '@tarojs/components'
import Taro, { useShareAppMessage } from '@tarojs/taro'
import './index.scss'

const BANNER_ITEMS = [
  { id: '1', title: 'AI 红包封面', subtitle: '春节限定创作', color: '#D4382C' },
  { id: '2', title: '国潮贺卡', subtitle: '传统与现代融合', color: '#C7944A' },
  { id: '3', title: '年画壁纸', subtitle: '经典年画新创', color: '#5856D6' },
]

const CATEGORIES = [
  { id: 'hongbao', name: '红包封面', color: '#D4382C' },
  { id: 'card', name: '贺卡', color: '#C7944A' },
  { id: 'wallpaper', name: '壁纸', color: '#007AFF' },
  { id: 'avatar', name: '头像', color: '#5E5CE6' },
]

const GALLERY_ITEMS = [
  { id: '1', title: '金龙献瑞', style: '年画风', color: '#D4382C' },
  { id: '2', title: '春到人间', style: '剪纸风', color: '#C62828' },
  { id: '3', title: '花开富贵', style: '国潮风', color: '#C7944A' },
  { id: '4', title: '福满乾坤', style: '水墨画', color: '#636366' },
  { id: '5', title: '瑞雪丰年', style: '水彩', color: '#007AFF' },
  { id: '6', title: '新春大吉', style: '古风', color: '#5E5CE6' },
]

export default function Index() {
  const { credits, isLoggedIn, dailyCheckin } = useUserStore()

  useShareAppMessage(() => {
    const inviteCode = useUserStore.getState().user?.inviteCode || ''
    return {
      title: 'MetamorphArt - AI 红包封面生成器',
      path: `/pages/index/index?inviteCode=${inviteCode}`,
    }
  })

  const goToWorkspace = () => {
    Taro.switchTab({ url: '/pages/workspace/index' })
  }

  const handleCheckin = async () => {
    if (!isLoggedIn) {
      Taro.showToast({ title: '请先登录', icon: 'none' })
      return
    }
    await dailyCheckin()
  }

  return (
    <View className="home">
      {/* Header */}
      <View className="home__header">
        <View className="home__header-left">
          <Text className="home__title">MetamorphArt</Text>
          <Text className="home__subtitle">AI 图片风格化创作</Text>
        </View>
        {isLoggedIn && credits && (
          <View className="home__credits-badge">
            <Text className="home__credits-num">{credits.balance}</Text>
            <Text className="home__credits-unit">次</Text>
          </View>
        )}
      </View>

      {/* Banner Swiper */}
      <View className="home__banner">
        <Swiper
          className="home__swiper"
          indicatorDots
          indicatorColor="rgba(255,255,255,0.3)"
          indicatorActiveColor="#FFFFFF"
          autoplay
          circular
          interval={4000}
        >
          {BANNER_ITEMS.map(item => (
            <SwiperItem key={item.id}>
              <View className="home__banner-item" style={{ background: item.color }} onClick={goToWorkspace}>
                <Text className="home__banner-title">{item.title}</Text>
                <Text className="home__banner-subtitle">{item.subtitle}</Text>
              </View>
            </SwiperItem>
          ))}
        </Swiper>
      </View>

      {/* Category Tags */}
      <View className="home__categories">
        {CATEGORIES.map(cat => (
          <View
            key={cat.id}
            className="home__category-tag"
            onClick={goToWorkspace}
          >
            <View className="home__category-dot" style={{ backgroundColor: cat.color }} />
            <Text className="home__category-name">{cat.name}</Text>
          </View>
        ))}
      </View>

      {/* CTA Button */}
      <View className="home__cta" onClick={goToWorkspace}>
        <Text className="home__cta-text">开始创作</Text>
      </View>

      {/* Checkin + Ad Cards */}
      <View className="home__cards">
        <View className="home__card" onClick={handleCheckin}>
          <View className="home__card-content">
            <Text className="home__card-title">每日签到</Text>
            <Text className="home__card-desc">
              {credits?.dailyCheckedIn ? '今日已签到' : '领取 1 次生成'}
            </Text>
          </View>
          <View className={`home__card-badge ${credits?.dailyCheckedIn ? 'home__card-badge--done' : ''}`}>
            <Text className="home__card-badge-text">{credits?.dailyCheckedIn ? '已领' : '+1'}</Text>
          </View>
        </View>

        <View
          className="home__card"
          onClick={() => Taro.showToast({ title: '广告加载中...', icon: 'loading' })}
        >
          <View className="home__card-content">
            <Text className="home__card-title">看视频得积分</Text>
            <Text className="home__card-desc">奖励 1 次生成</Text>
          </View>
          <View className="home__card-badge">
            <Text className="home__card-badge-text">+1</Text>
          </View>
        </View>
      </View>

      {/* Gallery */}
      <View className="home__gallery">
        <Text className="home__section-title">精选作品</Text>
        <View className="home__gallery-grid">
          {GALLERY_ITEMS.map(item => (
            <View key={item.id} className="home__gallery-item" onClick={goToWorkspace}>
              <View
                className="home__gallery-placeholder"
                style={{ backgroundColor: `${item.color}18` }}
              >
                <View className="home__gallery-accent" style={{ backgroundColor: item.color }} />
              </View>
              <View className="home__gallery-info">
                <Text className="home__gallery-name">{item.title}</Text>
                <Text className="home__gallery-style">{item.style}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  )
}

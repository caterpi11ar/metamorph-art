import { Image, Swiper, SwiperItem, View } from '@tarojs/components'
import React, { useState } from 'react'
import './index.scss'

const HomePage: React.FC = () => {
  const [recommendImages] = useState([
    'https://example.com/recommend1.jpg',
    'https://example.com/recommend2.jpg',
    'https://example.com/recommend3.jpg',
  ])

  const [userGallery] = useState([
    'https://example.com/user1.jpg',
    'https://example.com/user2.jpg',
    'https://example.com/user3.jpg',
  ])

  const [hotActivities] = useState([
    {
      title: '夏日艺术创作挑战',
      description: '用AI重新定义艺术边界',
      image: 'https://example.com/activity1.jpg',
    },
    {
      title: '复古风格转换大赛',
      description: '将现代照片转换为经典风格',
      image: 'https://example.com/activity2.jpg',
    },
  ])

  return (
    <View className="home-page">
      {/* 推荐轮播图 */}
      <Swiper
        className="recommend-swiper"
        indicatorColor="#999"
        indicatorActiveColor="#333"
        circular
        indicatorDots
        autoplay
      >
        {recommendImages.map((img, index) => (
          <SwiperItem key={index}>
            <Image
              src={img}
              mode="aspectFill"
              className="swiper-image"
            />
          </SwiperItem>
        ))}
      </Swiper>

      {/* 用户作品画廊 */}
      <View className="user-gallery">
        <View className="section-title">用户作品</View>
        <View className="gallery-container">
          {userGallery.map((img, index) => (
            <Image
              key={index}
              src={img}
              mode="aspectFill"
              className="gallery-image"
            />
          ))}
        </View>
      </View>

      {/* 热门活动 */}
      <View className="hot-activities">
        <View className="section-title">热门活动</View>
        {hotActivities.map((activity, index) => (
          <View key={index} className="activity-card">
            <Image
              src={activity.image}
              mode="aspectFill"
              className="activity-image"
            />
            <View className="activity-content">
              <View className="activity-title">{activity.title}</View>
              <View className="activity-description">{activity.description}</View>
            </View>
          </View>
        ))}
      </View>

      {/* 广告位预留 */}
      <View className="ad-container">
        {/* 可以接入广告SDK */}
      </View>
    </View>
  )
}

export default HomePage

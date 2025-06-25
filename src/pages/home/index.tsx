import { Image, Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import React from 'react'
import './index.scss'

const HomePage: React.FC = () => {
  const handleStartClick = () => {
    Taro.navigateTo({
      url: '/pages/workspace/index',
    })
  }

  return (
    <View className="home-container">
      <View className="header">
        <Text className="app-title">MetamorphArt</Text>
        <Image
          className="user-avatar"
          src="https://img.zcool.cn/community/01c6c05e5e06cda801216518a0e6b3.jpg@1280w_1l_2o_100sh.jpg"
        />
      </View>

      <View className="banner-section">
        <Image
          className="banner-image"
          src="https://img.zcool.cn/community/01c6c05e5e06cda801216518a0e6b3.jpg@1280w_1l_2o_100sh.jpg"
        />
        <View className="banner-overlay">
          <Text className="banner-title">探索艺术的无限可能</Text>
        </View>
      </View>

      <View className="feature-grid">
        <View className="feature-card">
          <View className="feature-icon">🎨</View>
          <Text className="feature-title">多样风格</Text>
          <Text className="feature-description">丰富的艺术风格选择</Text>
        </View>
        <View className="feature-card">
          <View className="feature-icon">✨</View>
          <Text className="feature-title">智能转换</Text>
          <Text className="feature-description">一键艺术风格转换</Text>
        </View>
        <View className="feature-card">
          <View className="feature-icon">💾</View>
          <Text className="feature-title">轻松保存</Text>
          <Text className="feature-description">快速保存您的艺术作品</Text>
        </View>
        <View className="feature-card">
          <View className="feature-icon">🌈</View>
          <Text className="feature-title">高质量</Text>
          <Text className="feature-description">专业级图像处理</Text>
        </View>
      </View>

      <View className="action-section">
        <View
          className="start-button"
          onClick={handleStartClick}
        >
          开始创作
        </View>
      </View>
    </View>
  )
}

export default HomePage

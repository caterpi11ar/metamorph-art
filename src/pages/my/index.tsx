import { Button, Image, Switch, Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import React, { useState } from 'react'
import './index.scss'

const MyPage: React.FC = () => {
  const [userInfo, setUserInfo] = useState({
    avatarUrl: 'https://example.com/default-avatar.png',
    nickname: '未登录',
    isLoggedIn: false,
  })

  const [settings, setSettings] = useState({
    darkMode: false,
    notifications: true,
    aiProcessingQuality: 'standard',
  })

  // 登录处理
  const handleLogin = async () => {
    try {
      const { userInfo: loginUserInfo } = await Taro.getUserProfile({
        desc: '用于完善会员资料',
      })

      setUserInfo({
        avatarUrl: loginUserInfo.avatarUrl,
        nickname: loginUserInfo.nickName,
        isLoggedIn: true,
      })
    }
    catch (error) {
      console.error(error)
      Taro.showToast({
        title: '登录失败',
        icon: 'none',
      })
    }
  }

  // 切换设置
  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: typeof prev[key] === 'boolean'
        ? !prev[key]
        : prev[key],
    }))
  }

  // 选择AI处理质量
  const handleQualityChange = () => {
    const qualities = ['low', 'standard', 'high']
    const currentIndex = qualities.indexOf(settings.aiProcessingQuality)
    const nextIndex = (currentIndex + 1) % qualities.length

    setSettings(prev => ({
      ...prev,
      aiProcessingQuality: qualities[nextIndex],
    }))
  }

  // 退出登录
  const handleLogout = () => {
    setUserInfo({
      avatarUrl: 'https://example.com/default-avatar.png',
      nickname: '未登录',
      isLoggedIn: false,
    })
  }

  return (
    <View className="my-page">
      {/* 用户信息区域 */}
      <View className="user-info-section">
        <Image
          src={userInfo.avatarUrl}
          className="user-avatar"
          mode="aspectFill"
        />
        <View className="user-details">
          <Text className="nickname">
            {userInfo.nickname}
          </Text>
          {!userInfo.isLoggedIn
            ? (
                <Button
                  onClick={handleLogin}
                  className="login-button"
                >
                  微信登录
                </Button>
              )
            : (
                <Button
                  onClick={handleLogout}
                  className="logout-button"
                >
                  退出登录
                </Button>
              )}
        </View>
      </View>

      {/* 设置区域 */}
      <View className="settings-section">
        <View className="setting-item">
          <Text>深色模式</Text>
          <Switch
            checked={settings.darkMode}
            onChange={() => toggleSetting('darkMode')}
          />
        </View>

        <View className="setting-item">
          <Text>通知提醒</Text>
          <Switch
            checked={settings.notifications}
            onChange={() => toggleSetting('notifications')}
          />
        </View>

        <View
          className="setting-item"
          onClick={handleQualityChange}
        >
          <Text>AI处理质量</Text>
          <Text className="quality-value">
            {settings.aiProcessingQuality}
          </Text>
        </View>
      </View>

      {/* 其他功能入口 */}
      <View className="function-section">
        <View className="function-item">
          <Text>关于我们</Text>
        </View>
        <View className="function-item">
          <Text>意见反馈</Text>
        </View>
        <View className="function-item">
          <Text>隐私政策</Text>
        </View>
      </View>
    </View>
  )
}

export default MyPage

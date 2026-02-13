export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/workspace/index',
    'pages/profile/index',
    'pages/invitation/index',
    'pages/history/index',
    'pages/checkin/index',
  ],
  window: {
    backgroundTextStyle: 'dark',
    navigationBarBackgroundColor: '#ffffff',
    navigationBarTitleText: 'MetamorphArt',
    navigationBarTextStyle: 'black',
  },
  tabBar: {
    color: '#AEAEB2',
    selectedColor: '#007AFF',
    backgroundColor: '#FFFFFF',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: './assets/icons/png/home_outline.png',
        selectedIconPath: './assets/icons/png/home_filled.png',
      },
      {
        pagePath: 'pages/workspace/index',
        text: '创作',
        iconPath: './assets/icons/png/create_outline.png',
        selectedIconPath: './assets/icons/png/create_filled.png',
      },
      {
        pagePath: 'pages/profile/index',
        text: '我的',
        iconPath: './assets/icons/png/profile_outline.png',
        selectedIconPath: './assets/icons/png/profile_filled.png',
      },
    ],
  },
})

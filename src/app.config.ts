export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/workspace/index',
    'pages/my/index',
  ],
  window: {
    backgroundTextStyle: 'dark',
    navigationBarBackgroundColor: '#ffffff',
    navigationBarTitleText: 'MetamorphArt',
    navigationBarTextStyle: 'black',
    backgroundColor: '#f5f5f5',
  },
  tabBar: {
    color: '#8a8a8a',
    selectedColor: '#007AFF',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: 'assets/icons/png/home_outline.png',
        selectedIconPath: 'assets/icons/png/home_filled.png',
      },
      {
        pagePath: 'pages/workspace/index',
        text: '创作',
        iconPath: 'assets/icons/png/create_outline.png',
        selectedIconPath: 'assets/icons/png/create_filled.png',
      },
      {
        pagePath: 'pages/my/index',
        text: '我的',
        iconPath: 'assets/icons/png/profile_outline.png',
        selectedIconPath: 'assets/icons/png/profile_filled.png',
      },
    ],
  },
})

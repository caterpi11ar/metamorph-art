export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/workspace/index',
    'pages/my/index',
    'pages/profile/index',
  ],
  window: {
    backgroundTextStyle: 'dark',
    navigationBarBackgroundColor: '#ffffff',
    navigationBarTitleText: 'MetamorphArt',
    navigationBarTextStyle: 'black',
  },
  tabBar: {
    position: 'bottom',
    color: '#8E8E93',
    selectedColor: '#007AFF',
    backgroundColor: '#F2F2F7',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
        // iconPath: 'assets/icons/system/home.png',
        // selectedIconPath: 'assets/icons/system/home-fill.png',
      },
      {
        pagePath: 'pages/workspace/index',
        text: '工作区',
        // iconPath: 'assets/icons/system/product.png',
        // selectedIconPath: 'assets/icons/system/product-fill.png',
      },
      {
        pagePath: 'pages/profile/index',
        text: '我的',
        // iconPath: 'assets/icons/system/customer.png',
        // selectedIconPath: 'assets/icons/system/customer-fill.png',
      },
    ],
  },
})

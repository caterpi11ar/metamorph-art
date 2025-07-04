# metamorph-art

AI 图片生成表情包微信小程序

## 项目简介

metamorph-art 是一款基于 AI 技术的微信小程序，用于生成个性化表情包。用户可以通过简单的操作，快速创建符合自己需求的表情图片。

## 功能特点

- **图像比例选择**：支持多种常用比例（1:1、4:3、16:9 等）
- **表情类型选择**：提供多种表情风格（搞笑、可爱、严肃等）
- **文字添加**：支持在表情包上添加自定义文字
- **模板选择**：内置多种表情包模板
- **一键分享**：生成后可直接分享到微信聊天、朋友圈等

## 技术栈

- 前端：
  - Taro 框架 + React + TypeScript
  - shadcn ui + tailwind

- AI 图像生成：接入第三方 AI 图像生成 API

## 界面设计

界面设计严格遵循 iOS 设计规范，确保 1:1 还原 iOS 原生体验。

### 整体布局

- **标签栏（TabBar）**：底部固定标签栏，包含三个主要导航项：首页、工作区、我的
- **导航栏（NavBar）**：顶部导航栏采用 iOS 风格，包含页面标题和操作按钮
- **状态栏**：遵循 iOS 状态栏设计，显示时间、信号强度、电池等信息
- **字体**：全局使用 San Francisco 字体（iOS 默认字体）或其近似字体

### 首页（Home）

- **顶部轮播**：展示精选表情包案例和最新活动
- **推荐作品区**：瀑布流展示优秀表情包案例，支持横向滑动查看更多
- **热门模板**：展示当前热门表情包模板，采用 iOS 风格卡片设计
- **活动推广**：展示当前活动和优惠信息，使用 iOS 原生弹窗和横幅样式

### 工作区（Workspace）

- **创建新项目**：大型醒目的创建按钮，采用 iOS 风格渐变色
- **项目列表**：展示用户正在进行的项目，使用 iOS 列表样式
- **快速工具栏**：提供快速访问常用工具的选项，采用 iOS 工具栏设计
- **模板选择**：提供各种表情包模板，使用 iOS 网格视图展示
- **编辑界面**：
  - 顶部工具栏：包含撤销、重做、保存等操作
  - 中间编辑区：主要编辑区域，支持拖拽、缩放等操作
  - 底部属性栏：调整图像属性，如比例、滤镜等

### 我的（Profile）

- **用户信息**：顶部展示用户头像、昵称、等级等信息
- **设置选项**：包含账号设置、通知设置、隐私设置等，采用 iOS 设置页面样式
- **消息中心**：显示系统通知和更新信息

### 交互设计

- **手势操作**：支持 iOS 标准手势，如轻扫、捏合、长按等
- **动画效果**：页面切换和元素加载使用 iOS 原生动画效果
- **触觉反馈**：在关键操作时提供 iOS 风格的触觉反馈
- **弹窗样式**：采用 iOS 原生弹窗设计，包括警告、确认和操作表

### 配色方案

- **主色调**：采用 iOS 默认蓝色 (#007AFF) 作为主色调
- **背景色**：浅灰色背景 (#F2F2F7)，符合 iOS 界面风格
- **文本颜色**：主要文本为深色 (#000000)，次要文本为灰色 (#8E8E93)
- **强调色**：使用 iOS 系统强调色，如红色 (#FF3B30)、绿色 (#34C759) 等

## 使用方法

1. 打开小程序
2. 选择需要的表情风格类型
3. 设置图像比例
4. 输入需要的表情，一次最多 9 个
5. 点击生成按钮
6. 等待 AI 生成结果
7. 保存或分享生成的表情包

## 开发计划

### MVP 阶段（预计 4 周）

| 周次 | 开发任务 | 具体内容 |
| ---- | -------- | -------- |
| 第 1 周 | 基础界面搭建 | 首页布局、表单组件开发、结果展示页面 |
| 第 1-2 周 | AI 接口对接 | 选择合适的 AI 图像生成 API，完成基础调用功能 |
| 第 2 周 | 表情类型库初步建设 | 实现 3-5 种基础表情风格选项 |
| 第 3 周 | 核心功能完善 | 图像比例选择、文本输入功能、生成结果展示 |
| 第 4 周 | 测试与优化 | 功能测试、性能优化、小程序审核准备 |

### 成熟稳定阶段（预计 8 周）

| 周次 | 开发任务 | 具体内容 |
| ---- | -------- | -------- |
| 第 5-6 周 | 用户系统开发 | 用户登录、收藏功能、历史记录 |
| 第 6-7 周 | 表情类型库扩展 | 增加至 10+ 种表情风格，优化生成效果 |
| 第 7-8 周 | 分享功能实现 | 微信聊天分享、朋友圈分享、自定义分享卡片 |
| 第 9-10 周 | 高级功能开发 | 模板选择功能、批量生成优化、自定义风格混合 |
| 第 11-12 周 | 性能与体验优化 | 加载速度优化、UI/UX 改进、用户反馈收集与迭代 |

## 里程碑

1. **MVP 上线**：基础功能可用，支持简单的表情包生成（第 4 周末）
2. **1.0 正式版**：完整功能上线，用户系统完善（第 8 周末）
3. **2.0 增强版**：高级功能全部实现，性能与体验优化完成（第 12 周末）

## 风险评估

- AI 接口调用成本控制
- 生成内容合规性审核
- 小程序审核通过率
- 用户体验与实际效果的平衡

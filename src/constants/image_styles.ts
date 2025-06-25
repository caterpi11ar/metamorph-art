// 图像风格定义
export interface ImageStyleConfig {
  id: string
  name: string
  description: string
  prompt: string
  color: string
  icon: string
}

export const IMAGE_STYLES: ImageStyleConfig[] = [
  {
    id: 'anime',
    name: '动漫风格',
    description: '将照片转换为日系动漫画风格',
    prompt: 'Anime style, high-quality illustration, soft colors, detailed characters, clean lines, vibrant palette',
    color: '#FF6B6B',
    icon: '🎨',
  },
  {
    id: 'ink_wash',
    name: '水墨画',
    description: '传统中国水墨画风格，墨韵悠长',
    prompt: 'Chinese ink wash painting, soft brush strokes, minimalist composition, grayscale, traditional landscape',
    color: '#4ECDC4',
    icon: '🖌️',
  },
  {
    id: 'ancient',
    name: '古风',
    description: '复古中国风，诗意盎然',
    prompt: 'Traditional Chinese ancient style, historical costume, soft lighting, elegant composition, poetic atmosphere',
    color: '#A78295',
    icon: '🏮',
  },
  {
    id: 'cyberpunk',
    name: '赛博朋克',
    description: '未来科技感，充满霓虹与金属质感',
    prompt: 'Cyberpunk style, neon colors, high-tech details, urban dystopia, sharp edges, digital glitch effects',
    color: '#6A5ACD',
    icon: '🤖',
  },
  {
    id: 'oil_painting',
    name: '油画',
    description: '经典油画风格，厚重笔触',
    prompt: 'Oil painting style, rich textures, impasto technique, vibrant colors, expressive brushstrokes',
    color: '#FFD700',
    icon: '🖼️',
  },
  {
    id: 'watercolor',
    name: '水彩',
    description: '柔和透明的水彩效果',
    prompt: 'Watercolor style, soft blending, translucent layers, delicate color gradients, light and airy',
    color: '#87CEEB',
    icon: '💧',
  },
]

import Taro from '@tarojs/taro'

export async function chooseImage(): Promise<string | null> {
  try {
    const result = await Taro.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
    })
    return result.tempFilePaths[0] || null
  }
  catch {
    return null
  }
}

export function previewImage(url: string, urls?: string[]): void {
  Taro.previewImage({
    current: url,
    urls: urls || [url],
  })
}

export async function saveToAlbum(url: string): Promise<boolean> {
  try {
    await Taro.saveImageToPhotosAlbum({ filePath: url })
    Taro.showToast({ title: '已保存到相册', icon: 'success' })
    return true
  }
  catch (error: any) {
    if (error.errMsg?.includes('auth deny')) {
      Taro.showModal({
        title: '提示',
        content: '需要您授权保存图片到相册',
        confirmText: '去设置',
        success: (res) => {
          if (res.confirm) {
            Taro.openSetting()
          }
        },
      })
    }
    else {
      Taro.showToast({ title: '保存失败', icon: 'none' })
    }
    return false
  }
}

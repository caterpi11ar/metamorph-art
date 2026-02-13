import type { ApiResponse } from '@/types/api'
import { getToken, removeToken } from '@/utils/storage'
import Taro from '@tarojs/taro'

const BASE_URL = process.env.API_BASE_URL || 'https://api.metamorphart.cn'

interface RequestOptions {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  data?: any
  header?: Record<string, string>
}

export async function request<T = any>(options: RequestOptions): Promise<T> {
  const token = getToken()
  const header: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.header,
  }

  if (token) {
    header.Authorization = `Bearer ${token}`
  }

  try {
    const response = await Taro.request({
      url: `${BASE_URL}${options.url}`,
      method: options.method || 'GET',
      data: options.data,
      header,
      timeout: 30000,
    })

    const result = response.data as ApiResponse<T>

    if (response.statusCode === 401) {
      removeToken()
      Taro.showToast({ title: '登录已过期，请重新登录', icon: 'none' })
      throw new Error('Unauthorized')
    }

    if (result.code !== 0) {
      throw new Error(result.message || '请求失败')
    }

    return result.data
  }
  catch (error: any) {
    if (error.message !== 'Unauthorized') {
      console.error('API request failed:', error)
    }
    throw error
  }
}

export function get<T = any>(url: string, data?: any) {
  return request<T>({ url, method: 'GET', data })
}

export function post<T = any>(url: string, data?: any) {
  return request<T>({ url, method: 'POST', data })
}

export function put<T = any>(url: string, data?: any) {
  return request<T>({ url, method: 'PUT', data })
}

export function del<T = any>(url: string, data?: any) {
  return request<T>({ url, method: 'DELETE', data })
}

import type { PaginatedResponse } from '@/types/api'
import type { GenerationParams, GenerationTask } from '@/types/generation'
import { get, post } from './index'

export function submitGeneration(params: GenerationParams): Promise<GenerationTask> {
  return post<GenerationTask>('/generation/submit', params)
}

export function getGenerationStatus(taskId: string): Promise<GenerationTask> {
  return get<GenerationTask>(`/generation/task/${taskId}`)
}

export function getGenerationHistory(page = 1, pageSize = 20): Promise<PaginatedResponse<GenerationTask>> {
  return get<PaginatedResponse<GenerationTask>>('/generation/history', { page, pageSize })
}

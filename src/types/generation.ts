export type GenerationMode = 'text2img' | 'img2img'

export type AspectRatio = '16:9' | '1:1' | '9:16'

export type ColorTone = 'warm' | 'cool' | 'auto'

export type DetailLevel = 'fast' | 'standard' | 'fine'

export interface GenerationParams {
  mode: GenerationMode
  prompt: string
  negativePrompt: string
  styleId: string
  aspectRatio: AspectRatio
  brightness: number
  colorTone: ColorTone
  detailLevel: DetailLevel
  styleStrength: number
  seed: string
  referenceImageUrl?: string
}

export type GenerationStatus = 'pending' | 'processing' | 'completed' | 'failed'

export interface GenerationTask {
  id: string
  status: GenerationStatus
  params: GenerationParams
  resultUrl?: string
  progress: number
  createdAt: string
  completedAt?: string
  creditsCost: number
  errorMessage?: string
}

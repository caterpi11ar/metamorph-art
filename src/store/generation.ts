import type { AspectRatio, ColorTone, DetailLevel, GenerationMode, GenerationParams, GenerationTask } from '@/types/generation'
import * as generationApi from '@/api/generation'
import { create } from 'zustand'

type WorkspacePhase = 'input' | 'generating' | 'result'

interface GenerationState {
  phase: WorkspacePhase
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
  referenceImagePath: string
  referenceImageUrl: string
  currentTask: GenerationTask | null
  history: GenerationTask[]
  historyPage: number
  historyHasMore: boolean
  pollingTimer: ReturnType<typeof setTimeout> | null

  setMode: (mode: GenerationMode) => void
  setPrompt: (prompt: string) => void
  setNegativePrompt: (negativePrompt: string) => void
  setStyleId: (styleId: string) => void
  setAspectRatio: (ratio: AspectRatio) => void
  setBrightness: (brightness: number) => void
  setColorTone: (tone: ColorTone) => void
  setDetailLevel: (level: DetailLevel) => void
  setStyleStrength: (strength: number) => void
  setSeed: (seed: string) => void
  setReferenceImage: (path: string, url: string) => void
  clearReferenceImage: () => void
  getParams: () => GenerationParams
  getCreditsCost: () => number
  submitGeneration: () => Promise<void>
  pollStatus: () => void
  stopPolling: () => void
  resetToInput: () => void
  loadHistory: (refresh?: boolean) => Promise<void>
}

export const useGenerationStore = create<GenerationState>((set, get) => ({
  phase: 'input',
  mode: 'text2img',
  prompt: '',
  negativePrompt: '',
  styleId: 'nianhua',
  aspectRatio: '16:9',
  brightness: 50,
  colorTone: 'auto',
  detailLevel: 'standard',
  styleStrength: 70,
  seed: '',
  referenceImagePath: '',
  referenceImageUrl: '',
  currentTask: null,
  history: [],
  historyPage: 1,
  historyHasMore: true,
  pollingTimer: null,

  setMode: mode => set({ mode }),
  setPrompt: prompt => set({ prompt }),
  setNegativePrompt: negativePrompt => set({ negativePrompt }),
  setStyleId: styleId => set({ styleId }),
  setAspectRatio: aspectRatio => set({ aspectRatio }),
  setBrightness: brightness => set({ brightness }),
  setColorTone: colorTone => set({ colorTone }),
  setDetailLevel: detailLevel => set({ detailLevel }),
  setStyleStrength: styleStrength => set({ styleStrength }),
  setSeed: seed => set({ seed }),
  setReferenceImage: (path, url) => set({ referenceImagePath: path, referenceImageUrl: url }),
  clearReferenceImage: () => set({ referenceImagePath: '', referenceImageUrl: '' }),

  getParams: () => {
    const s = get()
    return {
      mode: s.mode,
      prompt: s.prompt,
      negativePrompt: s.negativePrompt,
      styleId: s.styleId,
      aspectRatio: s.aspectRatio,
      brightness: s.brightness,
      colorTone: s.colorTone,
      detailLevel: s.detailLevel,
      styleStrength: s.styleStrength,
      seed: s.seed,
      referenceImageUrl: s.mode === 'img2img' ? s.referenceImageUrl : undefined,
    }
  },

  getCreditsCost: () => {
    const { detailLevel } = get()
    const costMap: Record<DetailLevel, number> = { fast: 1, standard: 1, fine: 2 }
    return costMap[detailLevel]
  },

  submitGeneration: async () => {
    const params = get().getParams()
    set({ phase: 'generating', currentTask: null })
    try {
      const task = await generationApi.submitGeneration(params)
      set({ currentTask: task })
      get().pollStatus()
    }
    catch (error) {
      set({ phase: 'input' })
      throw error
    }
  },

  pollStatus: () => {
    const poll = async () => {
      const { currentTask } = get()
      if (!currentTask)
        return

      try {
        const task = await generationApi.getGenerationStatus(currentTask.id)
        set({ currentTask: task })

        if (task.status === 'completed' || task.status === 'failed') {
          get().stopPolling()
          set({ phase: 'result' })
          return
        }

        const timer = setTimeout(poll, 2000)
        set({ pollingTimer: timer })
      }
      catch (error) {
        console.error('Polling failed:', error)
        const timer = setTimeout(poll, 3000)
        set({ pollingTimer: timer })
      }
    }

    poll()
  },

  stopPolling: () => {
    const { pollingTimer } = get()
    if (pollingTimer) {
      clearTimeout(pollingTimer)
      set({ pollingTimer: null })
    }
  },

  resetToInput: () => {
    get().stopPolling()
    set({ phase: 'input', currentTask: null })
  },

  loadHistory: async (refresh = false) => {
    const page = refresh ? 1 : get().historyPage
    try {
      const result = await generationApi.getGenerationHistory(page)
      set(state => ({
        history: refresh ? result.list : [...state.history, ...result.list],
        historyPage: page + 1,
        historyHasMore: result.hasMore,
      }))
    }
    catch (error) {
      console.error('Failed to load history:', error)
    }
  },
}))

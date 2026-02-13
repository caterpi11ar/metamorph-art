import type { ColorTone, DetailLevel } from '@/types/generation'
import AspectRatioSelector from '@/components/AspectRatioSelector'
import ControlsPanel from '@/components/ControlsPanel'
import GenerateButton from '@/components/GenerateButton'
import GenerationProgress from '@/components/GenerationProgress'
import ModeSelector from '@/components/ModeSelector'
import PromptInput from '@/components/PromptInput'
import ReferenceImagePicker from '@/components/ReferenceImagePicker'
import ResultPreview from '@/components/ResultPreview'
import SegmentedControl from '@/components/SegmentedControl'
import SliderControl from '@/components/SliderControl'
import StyleSelector from '@/components/StyleSelector'
import { useGenerationStore } from '@/store/generation'
import { useUserStore } from '@/store/user'
import { Input, ScrollView, Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'

const COLOR_TONE_OPTIONS: { key: ColorTone, label: string }[] = [
  { key: 'warm', label: '暖色调' },
  { key: 'cool', label: '冷色调' },
  { key: 'auto', label: '自动' },
]

const DETAIL_LEVEL_OPTIONS: { key: DetailLevel, label: string }[] = [
  { key: 'fast', label: '快速' },
  { key: 'standard', label: '标准' },
  { key: 'fine', label: '精细' },
]

export default function WorkSpace() {
  const store = useGenerationStore()
  const { isLoggedIn, credits } = useUserStore()
  const login = useUserStore(s => s.login)
  const refreshCredits = useUserStore(s => s.refreshCredits)

  const handleGenerate = async () => {
    if (!isLoggedIn) {
      try {
        await login()
      }
      catch {
        Taro.showToast({ title: '请先登录', icon: 'none' })
        return
      }
    }

    if (!store.prompt.trim()) {
      Taro.showToast({ title: '请输入创作描述', icon: 'none' })
      return
    }

    if (store.mode === 'img2img' && !store.referenceImageUrl) {
      Taro.showToast({ title: '请上传参考图片', icon: 'none' })
      return
    }

    const cost = store.getCreditsCost()
    if (credits && credits.balance < cost) {
      Taro.showToast({ title: '积分不足，请获取更多积分', icon: 'none' })
      return
    }

    try {
      await store.submitGeneration()
      refreshCredits()
    }
    catch (error: any) {
      Taro.showToast({ title: error.message || '生成失败', icon: 'none' })
    }
  }

  const handleReferenceSelect = (path: string) => {
    store.setReferenceImage(path, path)
  }

  // Generating phase
  if (store.phase === 'generating' && store.currentTask) {
    return (
      <View className="workspace">
        <GenerationProgress
          progress={store.currentTask.progress}
          status={store.currentTask.status}
        />
      </View>
    )
  }

  // Result phase
  if (store.phase === 'result' && store.currentTask) {
    return (
      <View className="workspace workspace--result">
        <ResultPreview
          task={store.currentTask}
          onRegenerate={handleGenerate}
          onBackToInput={store.resetToInput}
        />
      </View>
    )
  }

  // Input phase
  return (
    <ScrollView className="workspace" scrollY enableBackToTop>
      {/* Mode Selector */}
      <View className="workspace__section">
        <ModeSelector
          value={store.mode}
          onChange={store.setMode}
        />
      </View>

      {/* Prompt Input */}
      <View className="workspace__section">
        <Text className="workspace__label">创作描述</Text>
        <PromptInput
          value={store.prompt}
          onChange={store.setPrompt}
        />
      </View>

      {/* Reference Image (img2img mode) */}
      {store.mode === 'img2img' && (
        <View className="workspace__section">
          <ReferenceImagePicker
            imagePath={store.referenceImagePath}
            onSelect={handleReferenceSelect}
            onClear={store.clearReferenceImage}
          />
        </View>
      )}

      {/* Style Selector */}
      <View className="workspace__section">
        <StyleSelector
          selectedStyle={store.styleId}
          onStyleSelect={style => store.setStyleId(style.id)}
        />
      </View>

      {/* Controls Panel */}
      <View className="workspace__section">
        <ControlsPanel
          advancedChildren={(
            <>
              <View className="workspace__control-item">
                <Text className="workspace__control-label">排除词</Text>
                <Input
                  className="workspace__text-input"
                  value={store.negativePrompt}
                  onInput={e => store.setNegativePrompt(e.detail.value)}
                  placeholder="告诉 AI 不要生成什么..."
                  placeholderClass="workspace__text-input-placeholder"
                />
              </View>
              <View className="workspace__control-item">
                <Text className="workspace__control-label">随机种子</Text>
                <Input
                  className="workspace__text-input"
                  value={store.seed}
                  onInput={e => store.setSeed(e.detail.value)}
                  placeholder="留空随机，填入数字可复现结果"
                  placeholderClass="workspace__text-input-placeholder"
                  type="number"
                />
              </View>
            </>
          )}
        >
          {/* Aspect Ratio */}
          <View className="workspace__control-item">
            <Text className="workspace__control-label">画面比例</Text>
            <AspectRatioSelector
              value={store.aspectRatio}
              onChange={store.setAspectRatio}
            />
          </View>

          {/* Brightness */}
          <SliderControl
            label="亮度调节"
            value={store.brightness}
            onChange={store.setBrightness}
          />

          {/* Color Tone */}
          <SegmentedControl
            label="色调倾向"
            options={COLOR_TONE_OPTIONS}
            value={store.colorTone}
            onChange={store.setColorTone}
          />

          {/* Detail Level */}
          <SegmentedControl
            label="精细度"
            options={DETAIL_LEVEL_OPTIONS}
            value={store.detailLevel}
            onChange={store.setDetailLevel}
          />

          {/* Style Strength */}
          <SliderControl
            label="风格强度"
            value={store.styleStrength}
            onChange={store.setStyleStrength}
            suffix="%"
          />
        </ControlsPanel>
      </View>

      {/* Generate Button */}
      <View className="workspace__section workspace__section--bottom">
        <GenerateButton
          onClick={handleGenerate}
          creditsCost={store.getCreditsCost()}
          disabled={!store.prompt.trim()}
        />
      </View>
    </ScrollView>
  )
}

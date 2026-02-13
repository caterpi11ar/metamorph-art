import { Text, View } from '@tarojs/components'
import './index.scss'

interface GenerateButtonProps {
  onClick: () => void
  creditsCost: number
  disabled?: boolean
  loading?: boolean
}

export default function GenerateButton({ onClick, creditsCost, disabled, loading }: GenerateButtonProps) {
  return (
    <View
      className={`generate-btn ${disabled ? 'generate-btn--disabled' : ''} ${loading ? 'generate-btn--loading' : ''}`}
      onClick={() => !disabled && !loading && onClick()}
    >
      <Text className="generate-btn__text">
        {loading ? '生成中...' : '开始生成'}
      </Text>
      <View className="generate-btn__cost">
        <Text className="generate-btn__cost-text">
          消耗
          {creditsCost}
          {' '}
          积分
        </Text>
      </View>
    </View>
  )
}

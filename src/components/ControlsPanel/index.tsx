import type { PropsWithChildren } from 'react'
import { Text, View } from '@tarojs/components'
import { useState } from 'react'
import './index.scss'

interface ControlsPanelProps extends PropsWithChildren {
  advancedChildren?: React.ReactNode
}

export default function ControlsPanel({ children, advancedChildren }: ControlsPanelProps) {
  const [showAdvanced, setShowAdvanced] = useState(false)

  return (
    <View className="controls-panel">
      <View className="controls-panel__basic">
        {children}
      </View>
      {advancedChildren && (
        <>
          <View className="controls-panel__divider" />
          <View
            className="controls-panel__toggle"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            <Text className="controls-panel__toggle-text">
              {showAdvanced ? '收起高级选项' : '展开高级选项'}
            </Text>
          </View>
          {showAdvanced && (
            <View className="controls-panel__advanced">
              {advancedChildren}
            </View>
          )}
        </>
      )}
    </View>
  )
}

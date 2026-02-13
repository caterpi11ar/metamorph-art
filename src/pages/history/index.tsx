import EmptyState from '@/components/EmptyState'
import LoadingSpinner from '@/components/LoadingSpinner'
import { useGenerationStore } from '@/store/generation'
import { formatRelativeTime } from '@/utils/format'
import { previewImage } from '@/utils/image'
import { Image, Text, View } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.scss'

export default function HistoryPage() {
  const { history, historyHasMore, loadHistory } = useGenerationStore()

  useLoad(() => {
    loadHistory(true)
  })

  const handleLoadMore = () => {
    if (historyHasMore) {
      loadHistory()
    }
  }

  const completedItems = history.filter(item => item.status === 'completed' && item.resultUrl)

  return (
    <View className="history">
      {completedItems.length === 0
        ? <EmptyState title="暂无作品" description="去工作区创作你的第一件作品吧" color="#5E5CE6" />
        : (
            <>
              <View className="history__grid">
                {completedItems.map((item, idx) => (
                  <View
                    key={item.id}
                    className={`history__item ${idx % 3 === 0 ? 'history__item--tall' : ''}`}
                    onClick={() => previewImage(item.resultUrl!, completedItems.map(i => i.resultUrl!))}
                  >
                    <Image
                      className="history__image"
                      src={item.resultUrl!}
                      mode="aspectFill"
                      lazyLoad
                    />
                    <View className="history__info">
                      <Text className="history__prompt" numberOfLines={1}>
                        {item.params.prompt}
                      </Text>
                      <Text className="history__time">
                        {formatRelativeTime(item.createdAt)}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
              {historyHasMore && (
                <View className="history__load-more" onClick={handleLoadMore}>
                  <LoadingSpinner size="small" />
                  <Text className="history__load-more-text">加载更多</Text>
                </View>
              )}
            </>
          )}
    </View>
  )
}

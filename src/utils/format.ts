export function formatCredits(credits: number): string {
  if (credits >= 10000) {
    return `${(credits / 10000).toFixed(1)}w`
  }
  if (credits >= 1000) {
    return `${(credits / 1000).toFixed(1)}k`
  }
  return String(credits)
}

export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffSec = Math.floor(diffMs / 1000)
  const diffMin = Math.floor(diffSec / 60)
  const diffHour = Math.floor(diffMin / 60)
  const diffDay = Math.floor(diffHour / 24)

  if (diffSec < 60)
    return '刚刚'
  if (diffMin < 60)
    return `${diffMin}分钟前`
  if (diffHour < 24)
    return `${diffHour}小时前`
  if (diffDay < 30)
    return `${diffDay}天前`
  return `${date.getMonth() + 1}月${date.getDate()}日`
}

export function formatRelativeTime(dateInput: string | Date): string {
  const normalized = typeof dateInput === 'string' ? dateInput.replace(' ', 'T') : dateInput

  const target = new Date(normalized).getTime()

  if (Number.isNaN(target)) {
    return ''
  }

  const now = Date.now()
  const diffMs = now - target

  if (diffMs < 0) {
    return 'لحظاتی پیش'
  }

  const minute = 60 * 1000
  const hour = 60 * minute
  const day = 24 * hour
  const week = 7 * day
  const month = 30 * day
  const year = 365 * day

  if (diffMs < minute) return 'لحظاتی پیش'
  if (diffMs < hour) return `${Math.floor(diffMs / minute)} دقیقه پیش`
  if (diffMs < day) return `${Math.floor(diffMs / hour)} ساعت پیش`
  if (diffMs < week) return `${Math.floor(diffMs / day)} روز پیش`
  if (diffMs < month) return `${Math.floor(diffMs / week)} هفته پیش`
  if (diffMs < year) return `${Math.floor(diffMs / month)} ماه پیش`

  return `${Math.floor(diffMs / year)} سال پیش`
}

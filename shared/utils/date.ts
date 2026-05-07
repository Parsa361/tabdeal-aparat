export function normalizeDateInput(dateInput: string | Date): Date | null {
  const normalized = typeof dateInput === 'string' ? dateInput.replace(' ', 'T') : dateInput

  const date = new Date(normalized)

  if (Number.isNaN(date.getTime())) {
    return null
  }

  return date
}

export function formatRelativeTime(dateInput: string | Date, referenceNow = Date.now()): string {
  const date = normalizeDateInput(dateInput)

  if (!date) {
    return ''
  }

  const target = date.getTime()
  const diffMs = referenceNow - target

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

export function formatAbsoluteTime(dateInput: string | Date): string {
  const date = normalizeDateInput(dateInput)

  if (!date) {
    return ''
  }

  return new Intl.DateTimeFormat('fa-IR', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Tehran',
  }).format(date)
}

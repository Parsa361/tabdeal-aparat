export const toNumber = (value: unknown, fallback = 0): number => {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

export const getDaysSinceLabel = (dateValue?: string | null): string => {
  if (!dateValue) return 'نامشخص'

  const parsedDate = new Date(dateValue)

  if (Number.isNaN(parsedDate.getTime())) {
    return dateValue
  }

  const now = Date.now()
  const diffMs = now - parsedDate.getTime()

  if (diffMs <= 0) return 'امروز'

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (days === 0) return 'امروز'
  if (days === 1) return '1 روز پیش'

  return `${days} روز پیش`
}

export const normalizeTags = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value
      .map(String)
      .map((item) => item.trim())
      .filter(Boolean)
  }

  if (typeof value === 'string') {
    return value
      .split('-')
      .map((item) => item.trim().replace(/^#/, ''))
      .filter(Boolean)
  }

  return []
}

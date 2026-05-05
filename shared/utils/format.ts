export const toNumber = (value: unknown, fallback = 0): number => {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

export function formatViewsCount(value: number): string {
  return new Intl.NumberFormat('fa-IR').format(value)
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

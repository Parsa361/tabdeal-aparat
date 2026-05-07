export function parseAparatResponse<T>(rawResponse: unknown): T {
  if (typeof rawResponse !== 'string') {
    return rawResponse as T
  }

  try {
    return JSON.parse(rawResponse) as T
  } catch {
    throw createError({
      statusCode: 502,
      statusMessage: 'Invalid JSON response from Aparat API',
    })
  }
}

export function parsePositiveInteger(value: unknown, fallback: number): number {
  const parsedValue = Number(value)

  if (!Number.isFinite(parsedValue) || parsedValue < 1) {
    return fallback
  }

  return Math.floor(parsedValue)
}

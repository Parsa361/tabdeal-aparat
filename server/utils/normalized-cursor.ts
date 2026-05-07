function safeDecodeURIComponent(value: string) {
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

function normalizeSlashes(value: string) {
  return value.replace(/\/{2,}/g, '/')
}

function ensureLeadingSlash(value: string) {
  return value.startsWith('/') ? value : `/${value}`
}

function normalizePathname(value: string) {
  return ensureLeadingSlash(normalizeSlashes(value.trim()))
}

function isAllowedAparatHost(hostname: string) {
  const normalizedHost = hostname.toLowerCase()
  return normalizedHost === 'www.aparat.com' || normalizedHost === 'aparat.com'
}

function stripLegacyApiPrefix(pathname: string) {
  if (/^\/etc\/api\//i.test(pathname)) {
    return pathname.replace(/^\/etc\/api/i, '')
  }

  return pathname
}

function isAllowedAparatPathname(pathname: string) {
  const lowerPathname = pathname.toLowerCase()

  return (
    // legacy cursor endpoints
    lowerPathname.startsWith('/categoryvideos/') ||
    lowerPathname.startsWith('/videobysearch/') ||
    // newer aparat api cursor endpoints
    lowerPathname === '/api/fa/v1/etc/old/videobysearch' ||
    lowerPathname === '/api/fa/v1/video/video/list/categoryvideos'
  )
}

export function normalizeAparatCursor(cursor: unknown): string | null {
  if (!cursor || typeof cursor !== 'string') {
    return null
  }

  const decodedCursor = safeDecodeURIComponent(cursor).trim()

  if (!decodedCursor) {
    return null
  }

  try {
    const url = new URL(decodedCursor)

    if (!isAllowedAparatHost(url.hostname)) {
      return null
    }

    const normalizedPathname = stripLegacyApiPrefix(normalizePathname(url.pathname))

    if (!isAllowedAparatPathname(normalizedPathname)) {
      return null
    }

    return `${normalizedPathname}${url.search}`
  } catch {
    const normalizedInput = normalizeSlashes(decodedCursor)
    const queryIndex = normalizedInput.indexOf('?')

    const rawPathname = queryIndex >= 0 ? normalizedInput.slice(0, queryIndex) : normalizedInput

    const search = queryIndex >= 0 ? normalizedInput.slice(queryIndex) : ''

    const normalizedPathname = stripLegacyApiPrefix(normalizePathname(rawPathname))

    if (!isAllowedAparatPathname(normalizedPathname)) {
      return null
    }

    return `${normalizedPathname}${search}`
  }
}

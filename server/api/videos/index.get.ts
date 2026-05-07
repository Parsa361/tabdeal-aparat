import type { AparatCategoryVideosResponse, AparatVideoBySearchResponse } from '#shared/types/api'
import { toVideoListItem } from '#shared/transformers/video'
import { parseAparatResponse, parsePositiveInteger } from '#server/utils/parsing'
import { normalizeAparatCursor } from '#server/utils/normalized-cursor'

const MIN_SEARCH_LENGTH = 2
const DEFAULT_PER_PAGE = 9
const DEFAULT_PAGE = 1

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const page = parsePositiveInteger(query.page, DEFAULT_PAGE)
  const perPage = parsePositiveInteger(query.perPage, DEFAULT_PER_PAGE)
  const rawSearch = String(query.search || '').trim()

  const isSearchMode = rawSearch.length >= MIN_SEARCH_LENGTH

  const rawCursor = typeof query.cursor === 'string' ? query.cursor.trim() : ''
  const hasCursor = rawCursor.length > 0
  const cursorEndpoint = hasCursor ? normalizeAparatCursor(rawCursor) : null

  if (hasCursor && !cursorEndpoint) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid Aparat pagination cursor',
    })
  }

  if (isSearchMode) {
    const endpoint =
      cursorEndpoint ?? `/videoBySearch/text/${encodeURIComponent(rawSearch)}/perpage/${perPage}`

    const rawResponse = await aparatClient<unknown>(endpoint)

    const response = parseAparatResponse<Partial<AparatVideoBySearchResponse>>(rawResponse)
    const videos = response.videobysearch

    // There is a problem here
    // We can't use pagination on search mode because the API needs user to be authed
    if (!Array.isArray(videos)) {
      console.error('[Invalid Aparat search response]:', response)

      throw createError({
        statusCode: 502,
        statusMessage: 'Invalid response from Aparat search API',
      })
    }

    return {
      items: videos.map(toVideoListItem),
      page,
      perPage,
      hasMore: Boolean(response.ui?.pagingForward),
      pagingForward: response.ui?.pagingForward ?? null,
      pagingBack: response.ui?.pagingBack ?? null,
      source: 'search',
    }
  }

  const endpoint = cursorEndpoint ?? `/categoryVideos/perpage/${perPage}`

  const rawResponse = await aparatClient<unknown>(endpoint)

  const response = parseAparatResponse<Partial<AparatCategoryVideosResponse>>(rawResponse)
  const categoryVideos = response.categoryvideos

  if (!Array.isArray(categoryVideos)) {
    console.error('[Invalid Aparat categoryVideos response]:', response)

    throw createError({
      statusCode: 502,
      statusMessage: 'Invalid response from Aparat categoryVideos API',
    })
  }

  return {
    items: categoryVideos.map(toVideoListItem),
    page,
    perPage,
    hasMore: Boolean(response.ui?.pagingForward),
    pagingForward: response.ui?.pagingForward ?? null,
    pagingBack: response.ui?.pagingBack ?? null,
    source: 'default',
  }
})

import type { AparatVideoBySearchResponse } from '#shared/types/api'
import type { VideosListResponse } from '#shared/types/video'
import { normalizeVideoListItem } from '#shared/transformers/video'
import { aparatClient } from '#server/utils/aparat-client'

const DEFAULT_PER_PAGE = 12
const MIN_SEARCH_LENGTH = 3

export default defineEventHandler(async (event): Promise<VideosListResponse> => {
  const query = getQuery(event)

  const perPage = Number(query.perpage || DEFAULT_PER_PAGE)
  const rawSearch = String(query.search || '').trim()

  if (rawSearch.length < MIN_SEARCH_LENGTH) {
    return {
      items: [],
      perPage,
      hasMore: false,
    }
  }

  try {
    const response = await aparatClient<AparatVideoBySearchResponse>(
      `/videoBySearch/text/${encodeURIComponent(rawSearch)}/perpage/${perPage}`,
    )

    const items = Array.isArray(response?.videobysearch) ? response.videobysearch : []

    return {
      items: items.map(normalizeVideoListItem),
      perPage,
      hasMore: items.length >= perPage,
    }
  } catch (error) {
    console.error('[api/videos] aparat fetch failed:', error)

    throw createError({
      statusCode: 502,
      statusMessage: 'Failed to fetch videos from Aparat',
    })
  }
})

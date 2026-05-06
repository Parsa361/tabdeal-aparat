import type { AparatCategoryVideosResponse, AparatVideoBySearchResponse } from '#shared/types/api'
import { toVideoListItem } from '#shared/transformers/video'
import { parseAparatResponse } from '~~/server/utils/parse-response'

const MIN_SEARCH_LENGTH = 2
const DEFAULT_PER_PAGE = 9

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const perPage = normalizePerPage(query.perPage)
  const rawSearch = String(query.search || '').trim()

  const isSearchMode = rawSearch.length >= MIN_SEARCH_LENGTH

  if (isSearchMode) {
    const response = await aparatClient<AparatVideoBySearchResponse>(
      `/videoBySearch/text/${encodeURIComponent(rawSearch)}/perpage/${perPage}`,
    )

    console.log('Aparat searchVideos ui:', response.ui)

    return {
      items: response.videobysearch.map(toVideoListItem),
      perPage,
      hasMore: Boolean(response.ui?.pagingForward),
      source: 'search' as const,
    }
  }

  const rawResponse = await aparatClient<unknown>(`/categoryVideos/perpage/${perPage}`)
  const response = parseAparatResponse<AparatCategoryVideosResponse>(rawResponse)

  return {
    items: response.categoryvideos?.map(toVideoListItem),
    perPage,
    hasMore: Boolean(response.ui?.pagingForward),
    source: 'default' as const,
  }
})

function normalizePerPage(value: unknown) {
  const parsed = Number(value ?? DEFAULT_PER_PAGE)

  if (!Number.isFinite(parsed)) {
    return DEFAULT_PER_PAGE
  }

  if (parsed < 1) {
    return DEFAULT_PER_PAGE
  }

  if (parsed > 50) {
    return 50
  }

  return Math.floor(parsed)
}

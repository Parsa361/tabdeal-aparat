import type { AparatCategoryVideosResponse } from '#shared/types/api'
import { toVideoListItem } from '#shared/transformers/video'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const perPage = Number(query.perPage ?? 9)
  const rawSearch = String(query.search || '').trim()

  const response = await aparatClient<AparatCategoryVideosResponse>(
    `/videoBySearch/text/${encodeURIComponent(rawSearch)}/perpage/${perPage}`,
  )

  return {
    items: response.videobysearch.map(toVideoListItem),
    perpage: perPage,
    hasMore: Boolean(response.ui?.pagingForward),
  }
})

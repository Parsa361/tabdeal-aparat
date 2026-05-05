import { normalizeVideoDetail } from '#shared/transformers/video'
import type { AparatVideoResponse } from '#shared/types/api'
import type { VideoDetail } from '#shared/types/video'
import { aparatClient } from '#server/utils/aparat-client'

export default defineEventHandler(async (event): Promise<VideoDetail> => {
  const videohash = getRouterParam(event, 'videohash')

  if (!videohash) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Video id is required',
    })
  }

  try {
    const response = await aparatClient<AparatVideoResponse>(
      `/video/videohash/${encodeURIComponent(videohash)}`,
    )

    if (!response?.video) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Video not found',
      })
    }

    return normalizeVideoDetail(response.video)
  } catch (error: unknown) {
    if (typeof error === 'object' && error !== null && 'statusCode' in error) {
      throw error
    }

    console.error(`[api/videos/${videohash}] aparat fetch failed:`, error)

    throw createError({
      statusCode: 502,
      statusMessage: 'Failed to fetch video details from Aparat',
    })
  }
})

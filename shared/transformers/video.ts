import type { AparatVideoDetailApi, AparatVideoListItemApi } from '../types/api'
import type { VideoDetail, VideoListItem } from '../types/video'
import { getDaysSinceLabel, normalizeTags, toNumber } from '../utils/format'

export const normalizeVideoListItem = (item: AparatVideoListItemApi): VideoListItem => {
  return {
    videohash: String(item.id ?? ''),
    uid: String(item.uid ?? ''),
    title: String(item.title ?? '').trim(),
    channelUsername: String(item.username ?? '').trim(),
    channelName: String(item.sender_name ?? item.username ?? '').trim(),
    thumbnailUrl: String(item.big_poster ?? item.small_poster ?? ''),
    channelAvatarUrl: item.profilePhoto ? String(item.profilePhoto) : null,
    viewsCount: toNumber(item.visit_cnt, 0),
    durationSeconds: toNumber(item.duration, 0),
    publishedAtLabel: getDaysSinceLabel(item.sdate ?? null),
  }
}

export const normalizeVideoDetail = (item: AparatVideoDetailApi): VideoDetail => {
  const base = normalizeVideoListItem(item)

  return {
    ...base,
    description: String(item.descr ?? '').trim(),
    tags: normalizeTags(item.hashtag),
    likesCount:
      item.like_cnt === undefined || item.like_cnt === null ? null : toNumber(item.like_cnt, 0),
    followersCount: null,
    isLiked: null,
  }
}

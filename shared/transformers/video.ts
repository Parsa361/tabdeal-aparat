import type { AparatVideoItem, AparatVideoDetail } from '../types/api'
import type { VideoDetail, VideoListItem } from '../types/video'

export function toVideoListItem(item: AparatVideoItem): VideoListItem {
  return {
    videohash: item.uid,
    title: item.title,
    channelName: item.sender_name || item.username,
    thumbnailUrl: String(item.big_poster ?? item.small_poster ?? ''),
    channelAvatarUrl: item.profilePhoto,
    viewsCount: item.visit_cnt,
    publishedAt: item.create_date || null,
  }
}

function resolveVideoFileUrl(video: AparatVideoDetail): string | null {
  const firstDownloadUrl = video.file_link_all?.[0]?.urls?.[0]

  if (firstDownloadUrl) {
    return firstDownloadUrl
  }

  if (video.file_link) {
    return video.file_link
  }

  return null
}

export function normalizeVideoDetail(
  video: AparatVideoDetail,
  followersCount: number | null,
): VideoDetail {
  return {
    videohash: video.uid,
    title: video.title,
    channelName: video.sender_name || video.username,
    channelAvatarUrl: video.profilePhoto,
    thumbnailUrl: String(video.big_poster ?? video.small_poster ?? ''),
    videoEmbedUrl: video.frame,
    videoFileUrl: resolveVideoFileUrl(video),
    followersCount,
    viewsCount: video.visit_cnt,
    publishedAt: video.create_date || null,
    tags: (video.tags || []).map((tag) => ({
      name: tag.name,
    })),
    description: video.description || '',
    likesCount: video.like_cnt ?? 0,
  }
}

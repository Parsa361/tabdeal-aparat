export interface VideoListItem {
  videohash: string
  uid: string
  title: string
  channelUsername: string
  channelName: string
  thumbnailUrl: string
  channelAvatarUrl: string | null
  viewsCount: number
  durationSeconds: number
  publishedAtLabel: string
}

export interface VideoDetail extends VideoListItem {
  description: string
  tags: string[]
  likesCount: number | null
  followersCount: number | null
  isLiked: boolean | null
}

export interface VideosListResponse {
  items: VideoListItem[]
  perPage: number
  hasMore: boolean
}

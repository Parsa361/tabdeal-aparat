export interface VideoListItem {
  videohash: string
  title: string
  channelName: string
  thumbnailUrl: string
  channelAvatarUrl: string
  viewsCount: number
  publishedAt: string | null
  duration: number
}

export interface VideoTag {
  name: string
}

export interface VideoDetail {
  videohash: string
  title: string
  channelName: string
  channelAvatarUrl: string
  thumbnailUrl: string
  videoEmbedUrl: string
  videoFileUrl: string | null
  followersCount: number | null
  viewsCount: number
  publishedAt: string | null
  tags: VideoTag[]
  description: string
  likesCount: number
}

export interface VideosListResponse {
  items: VideoListItem[]
  perPage: number
  hasMore: boolean
  pagingForward: string | null
  pagingBack: string | null
  page: number
  source: 'default' | 'search'
}

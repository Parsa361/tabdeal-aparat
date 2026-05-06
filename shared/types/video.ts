export interface VideoListItem {
  videohash: string
  title: string
  channelName: string
  thumbnailUrl: string
  channelAvatarUrl: string
  viewsCount: number
  publishedAt: string | null
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
  source: 'default' | 'search'
}

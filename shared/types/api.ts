export interface AparatVideoListItemApi {
  id: string | number
  title?: string
  username?: string
  visit_cnt?: string | number
  uid?: string
  sender_name?: string
  big_poster?: string
  small_poster?: string
  profilePhoto?: string
  duration?: string | number
  sdate?: string
  descr?: string
  hashtag?: string | string[]
  like_cnt?: string | number
  [key: string]: unknown
}

export interface AparatVideoDetailApi extends AparatVideoListItemApi {
  meta?: {
    title?: string
    description?: string
    [key: string]: unknown
  }
}

export interface AparatVideoByUserResponse {
  videobyuser?: AparatVideoListItemApi[]
}

export interface AparatVideoBySearchResponse {
  videobysearch?: AparatVideoListItemApi[]
}

export interface AparatVideoResponse {
  video?: AparatVideoDetailApi
}

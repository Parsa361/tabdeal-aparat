export interface AparatVideoItem {
  id: string
  title: string
  username: string
  userid: string
  visit_cnt: number
  uid: string
  sender_name: string
  profilePhoto: string
  small_poster: string
  big_poster: string
  duration: number
  sdate: string
  create_date: string
  sdate_timediff: number
  frame: string
}

export interface AparatPagingUi {
  pagingForward?: string | boolean | number | null
  [key: string]: unknown
}

export interface AparatVideoBySearchResponse {
  videobysearch: AparatVideoItem[]
  ui?: AparatPagingUi
}

export interface AparatCategoryVideosResponse {
  categoryvideos: AparatVideoItem[]
  ui?: AparatPagingUi
}

export interface AparatVideoTag {
  name: string
  video_cnt: string
}

export interface AparatVideoDownloadItem {
  text: string
  size: string
  profile: string
  urls: string[]
}

export interface AparatVideoDetail {
  id: string
  title: string
  username: string
  userid: string
  visit_cnt: number
  uid: string
  sender_name: string
  big_poster: string
  small_poster: string
  profilePhoto: string
  duration: number
  sdate: string
  create_date: string
  sdate_timediff: number
  frame: string
  tags: AparatVideoTag[]
  tag_str: string
  description: string
  like_cnt: number
  file_link: string
  file_link_all: AparatVideoDownloadItem[]
}

export interface AparatVideoDetailResponse {
  video: AparatVideoDetail
}

export interface AparatUserProfileResponse {
  user_info?: {
    follower_cnt?: number | string
  }
}

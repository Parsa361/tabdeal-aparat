import type { VideosListResponse } from '#shared/types/video'

const MIN_SEARCH_LENGTH = 2
const DEFAULT_PER_PAGE = 9

export function useVideos(search: Ref<string> | ComputedRef<string>) {
  const normalizedSearch = computed(() => search.value.trim())

  const isSearchMode = computed(() => {
    return normalizedSearch.value.length >= MIN_SEARCH_LENGTH
  })

  const requestQuery = computed(() => {
    return {
      search: isSearchMode.value ? normalizedSearch.value : undefined,
      perPage: DEFAULT_PER_PAGE,
    }
  })

  const fetchKey = computed(() => {
    if (isSearchMode.value) {
      return `videos:search:${normalizedSearch.value}:perPage:${DEFAULT_PER_PAGE}`
    }

    return `videos:default:perPage:${DEFAULT_PER_PAGE}`
  })

  const defaultVideosResponse = {
    items: [],
    perPage: DEFAULT_PER_PAGE,
    hasMore: false,
    source: 'default',
  } satisfies VideosListResponse

  const { data, pending, error, refresh } = useFetch<VideosListResponse>('/api/videos', {
    query: requestQuery,
    key: fetchKey,
    server: true,
    lazy: false,
    default: () => defaultVideosResponse,
  })

  const items = computed(() => {
    return data.value?.items ?? []
  })

  const hasMore = computed(() => {
    return Boolean(data.value?.hasMore)
  })

  const source = computed(() => {
    return data.value?.source ?? 'default'
  })

  const isEmpty = computed(() => {
    return !pending.value && items.value.length === 0 && !error.value
  })

  return {
    items,
    pending,
    error,
    refresh,
    isEmpty,
    hasMore,
    source,
    isSearchMode,
  }
}

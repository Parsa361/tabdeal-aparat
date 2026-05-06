import type { VideosListResponse } from '#shared/types/video'

export function useVideos(search: Ref<string> | ComputedRef<string>) {
  const normalizedSearch = computed(() => search.value.trim())

  const shouldFetch = computed(() => normalizedSearch.value.length >= 2)

  const { data, pending, error, refresh } = useFetch<VideosListResponse>('/api/videos', {
    query: computed(() => ({
      search: normalizedSearch.value,
      perpage: 9,
    })),
    key: computed(() => `videos:${normalizedSearch.value}`),
    server: true,
    lazy: false,
    default: () => ({
      items: [],
      perPage: 9,
      hasMore: false,
    }),
  })

  const items = computed(() => {
    if (!shouldFetch.value) return []
    return data.value?.items ?? []
  })

  const isEmpty = computed(() => {
    if (!shouldFetch.value) return false
    return !pending.value && items.value.length === 0 && !error.value
  })

  return {
    items,
    pending,
    error,
    refresh,
    isEmpty,
    shouldFetch,
  }
}

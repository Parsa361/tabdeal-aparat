import type { VideoDetail } from '#shared/types/video'

export function useVideoDetail(videohash: Ref<string> | ComputedRef<string>) {
  const normalizedVideohash = computed(() => videohash.value.trim())

  const { data, pending, error, refresh } = useFetch<VideoDetail>(
    () => `/api/videos/${normalizedVideohash.value}`,
    {
      key: computed(() => `video:${normalizedVideohash.value}`),
      watch: [normalizedVideohash],
      server: true,
      lazy: false,
    },
  )

  return {
    video: computed(() => data.value ?? null),
    pending,
    error,
    refresh,
  }
}

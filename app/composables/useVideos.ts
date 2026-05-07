import type { VideosListResponse } from '#shared/types/video'

const MIN_SEARCH_LENGTH = 2
const DEFAULT_PER_PAGE = 9
const DEFAULT_PAGE = 1

type MaybeRefString = Ref<string> | ComputedRef<string>

type VideoPageState = {
  page: number
  items: VideosListResponse['items']
  pagingForward: string | null
  pagingBack: string | null
  hasMore: boolean
}

export async function useVideos(search: MaybeRefString) {
  const normalizedSearch = computed(() => search.value.trim())

  const isSearchMode = computed(() => {
    return normalizedSearch.value.length >= MIN_SEARCH_LENGTH
  })

  /**
   * ---------------------------------------
   * SSR initial fetch
   * ---------------------------------------
   */
  const defaultObj = {
    items: [],
    perPage: DEFAULT_PER_PAGE,
    page: DEFAULT_PAGE,
    hasMore: false,
    pagingBack: null,
    pagingForward: null,
    source: 'default',
  } satisfies VideosListResponse

  const {
    data: initialData,
    pending,
    error,
    refresh,
  } = await useFetch<VideosListResponse>('/api/videos', {
    query: computed(() => {
      const baseQuery: Record<string, string | number> = {
        perPage: DEFAULT_PER_PAGE,
      }

      if (isSearchMode.value) {
        baseQuery.search = normalizedSearch.value
      }

      return baseQuery
    }),
    default: () => defaultObj,
    watch: [normalizedSearch],
  })

  /**
   * ---------------------------------------
   * Default pagination state
   * فقط برای حالت بدون search
   * ---------------------------------------
   */
  const defaultPageCache = ref<Record<number, VideoPageState>>({})
  const currentDefaultPage = ref(DEFAULT_PAGE)
  const paginationPending = ref(false)
  const paginationError = ref<unknown>(null)

  function buildPageState(page: number, response: VideosListResponse): VideoPageState {
    return {
      page,
      items: response.items ?? [],
      pagingForward: response.pagingForward ?? null,
      pagingBack: response.pagingBack ?? null,
      hasMore: Boolean(response.pagingForward),
    }
  }

  function syncDefaultFirstPageFromInitialData(data: VideosListResponse | null) {
    if (!data || isSearchMode.value) return

    const firstPageState = buildPageState(DEFAULT_PAGE, data)

    defaultPageCache.value = {
      [DEFAULT_PAGE]: firstPageState,
    }

    currentDefaultPage.value = DEFAULT_PAGE
  }

  watch(
    initialData,
    (data) => {
      syncDefaultFirstPageFromInitialData(data)
    },
    { immediate: true },
  )

  const activeData = computed(() => {
    if (isSearchMode.value) {
      return initialData.value
    }

    const cachedPage = defaultPageCache.value[currentDefaultPage.value]
    if (cachedPage) {
      return {
        items: cachedPage.items,
        perPage: DEFAULT_PER_PAGE,
        page: cachedPage.page,
        hasMore: cachedPage.hasMore,
        pagingForward: cachedPage.pagingForward,
        pagingBack: cachedPage.pagingBack,
        source: 'default',
      } satisfies VideosListResponse
    }

    return initialData.value
  })

  async function goNextDefault() {
    if (isSearchMode.value || paginationPending.value) return

    const currentState = defaultPageCache.value[currentDefaultPage.value]
    const nextPage = currentDefaultPage.value + 1
    const cursor = currentState?.pagingForward

    if (!cursor) return

    if (defaultPageCache.value[nextPage]) {
      currentDefaultPage.value = nextPage
      return
    }

    paginationPending.value = true
    paginationError.value = null

    try {
      const response = await $fetch<VideosListResponse>('/api/videos', {
        query: {
          perPage: DEFAULT_PER_PAGE,
          cursor,
        },
      })

      defaultPageCache.value[nextPage] = buildPageState(nextPage, response)
      currentDefaultPage.value = nextPage
    } catch (err) {
      paginationError.value = err
    } finally {
      paginationPending.value = false
    }
  }

  async function goPreviousDefault() {
    if (isSearchMode.value || paginationPending.value) return

    const previousPage = currentDefaultPage.value - 1

    if (previousPage < DEFAULT_PAGE) return

    if (defaultPageCache.value[previousPage]) {
      currentDefaultPage.value = previousPage
    }
  }

  async function handlePaginationChange(targetPage: number) {
    if (isSearchMode.value) return
    if (targetPage === currentDefaultPage.value) return

    if (targetPage > currentDefaultPage.value) {
      await goNextDefault()
      return
    }

    await goPreviousDefault()
  }

  const items = computed(() => {
    return activeData.value?.items ?? []
  })

  const hasMore = computed(() => {
    if (isSearchMode.value) {
      return false
    }

    const currentState = defaultPageCache.value[currentDefaultPage.value]
    return Boolean(currentState?.pagingForward)
  })

  const currentPage = computed(() => {
    return isSearchMode.value ? DEFAULT_PAGE : currentDefaultPage.value
  })

  const combinedPending = computed(() => {
    return pending.value || paginationPending.value
  })

  const combinedError = computed(() => {
    return error.value || paginationError.value
  })

  return {
    items,
    pending: combinedPending,
    error: combinedError,
    isSearchMode,
    hasMore,
    currentPage,
    refresh,
    handlePaginationChange,
  }
}

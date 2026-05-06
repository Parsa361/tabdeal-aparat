const MIN_SEARCH_LENGTH = 2

export function useHeaderSearch() {
  const route = useRoute()
  const router = useRouter()

  const searchInput = ref(String(route.query.search || ''))

  watch(
    () => route.query.search,
    (value) => {
      const normalized = String(value || '')
      if (normalized !== searchInput.value) {
        searchInput.value = normalized
      }
    },
  )

  async function submitSearch() {
    const normalized = searchInput.value.trim()
    const nextQuery = { ...route.query }

    if (normalized.length >= MIN_SEARCH_LENGTH) {
      nextQuery.search = normalized
    } else {
      delete nextQuery.search
    }

    await router.replace({
      query: nextQuery,
    })
  }

  return {
    searchInput,
    submitSearch,
  }
}

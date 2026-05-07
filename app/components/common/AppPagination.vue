<script setup lang="ts">
type PaginationItem = {
  page: number
  active: boolean
}

const props = withDefaults(
  defineProps<{
    currentPage: number
    hasMore: boolean
    visiblePages?: number
  }>(),
  {
    visiblePages: 3,
  },
)

const emit = defineEmits<{
  change: [page: number]
}>()

const canGoPrevious = computed(() => props.currentPage > 1)
const canGoNext = computed(() => props.hasMore)

const pages = computed<PaginationItem[]>(() => {
  const currentPage = props.currentPage
  const visiblePages = props.visiblePages

  const chunkIndex = Math.floor((currentPage - 1) / visiblePages)
  const startPage = chunkIndex * visiblePages + 1
  const endPage = startPage + visiblePages - 1

  const items: PaginationItem[] = []

  for (let page = startPage; page <= endPage; page++) {
    items.push({
      page,
      active: page === currentPage,
    })
  }

  return items
})

function goToFirstPage() {
  if (!canGoPrevious.value) return
  emit('change', 1)
}

function goToPreviousPage() {
  if (!canGoPrevious.value) return
  emit('change', props.currentPage - 1)
}

function goToNextPage() {
  if (!canGoNext.value) return
  emit('change', props.currentPage + 1)
}

function goToNextChunk() {
  if (!canGoNext.value) return

  const nextChunkStart =
    Math.floor((props.currentPage - 1) / props.visiblePages) * props.visiblePages +
    props.visiblePages +
    1

  emit('change', nextChunkStart)
}
</script>

<template>
  <nav class="pagination" aria-label="Pagination" dir="ltr">
    <button
      type="button"
      class="pagination__control"
      :disabled="!canGoPrevious"
      aria-label="First page"
      @click="goToFirstPage"
    >
      &lt;&lt;
    </button>

    <button
      type="button"
      class="pagination__control"
      :disabled="!canGoPrevious"
      aria-label="Previous page"
      @click="goToPreviousPage"
    >
      &lt;
    </button>

    <button
      v-for="item in pages"
      :key="item.page"
      type="button"
      class="pagination__page"
      :class="{ 'pagination__page--active': item.active }"
      :aria-current="item.active ? 'page' : undefined"
      disabled
    >
      {{ item.page }}
    </button>

    <button
      type="button"
      class="pagination__control"
      :disabled="!canGoNext"
      aria-label="Next page"
      @click="goToNextPage"
    >
      &gt;
    </button>

    <button
      type="button"
      class="pagination__control"
      :disabled="true"
      aria-label="Next pages"
      @click="goToNextChunk"
    >
      &gt;&gt;
    </button>
  </nav>
</template>

<style scoped>
.pagination {
  direction: ltr;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 32px;
}

.pagination__control,
.pagination__page {
  min-width: 34px;
  height: 34px;
  border: 1px solid rgba(234, 179, 8, 0.35);
  border-radius: 999px;
  background: transparent;
  color: #eab308;
  font-size: 14px;
  font-weight: 600;
  transition:
    background-color 160ms ease,
    color 160ms ease,
    border-color 160ms ease,
    opacity 160ms ease,
    transform 160ms ease;
}

.pagination__control {
  cursor: pointer;
}

.pagination__control:hover:not(:disabled) {
  border-color: #eab308;
  background: rgba(234, 179, 8, 0.12);
  transform: translateY(-1px);
}

.pagination__page {
  cursor: default;
  opacity: 0.7;
}

.pagination__page--active {
  background: #eab308;
  color: #111827;
  border-color: #eab308;
  opacity: 1;
}

.pagination__control:disabled,
.pagination__page:disabled {
  cursor: not-allowed;
}

.pagination__control:disabled {
  opacity: 0.35;
}
</style>

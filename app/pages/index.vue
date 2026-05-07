<script setup lang="ts">
const route = useRoute()
const listSectionRef = ref<HTMLElement | null>(null)

definePageMeta({
  showHeaderSearch: true,
})

const searchQuery = computed(() => String(route.query.search || '').trim())

const { items, pending, error, isSearchMode, hasMore, currentPage, handlePaginationChange } =
  await useVideos(searchQuery)

const isEmpty = computed(() => {
  return !pending.value && items.value.length === 0 && !error.value
})

async function onPaginationChange(page: number) {
  await handlePaginationChange(page)
  await nextTick()

  if (listSectionRef.value) {
    smoothScrollToElement(listSectionRef.value, {
      duration: 500,
      offset: 16,
    })
  }
}

useSeoMeta({
  title: 'Tabdeal`s Aparat Videos',
  description: 'Search and explore Tabdeal`s Aparat videos',
})
</script>

<template>
  <section class="pt-8">
    <div v-if="pending" class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      <CommonAppSkeleton v-for="item in 6" :key="item" class="aspect-[16/9]" />
    </div>

    <div v-else-if="error">
      <CommonAppErrorState
        title="خطا در دریافت لیست ویدیوها"
        description="لطفاً چند لحظه دیگر دوباره تلاش کنید."
      />
    </div>

    <div v-else-if="isEmpty">
      <CommonAppEmptyState
        :title="isSearchMode ? 'نتیجه‌ای پیدا نشد' : 'ویدیویی برای نمایش وجود ندارد'"
        :description="
          isSearchMode
            ? 'عبارت جستجو را تغییر دهید و دوباره تلاش کنید.'
            : 'در حال حاضر لیست ویدیوها خالی است.'
        "
      />
    </div>

    <section v-else ref="listSectionRef">
      <VideoGrid :items="items" />

      <CommonAppPagination
        v-if="!isSearchMode"
        :current-page="currentPage"
        :has-more="hasMore"
        @change="onPaginationChange"
      />
    </section>
  </section>
</template>

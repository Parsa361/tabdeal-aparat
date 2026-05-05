<script setup lang="ts">
import AppEmptyState from '~/components/common/AppEmptyState.vue'
import AppErrorState from '~/components/common/AppErrorState.vue'
import AppSearchInput from '~/components/common/AppSearchInput.vue'
import AppSkeleton from '~/components/common/AppSkeleton.vue'
import VideoGrid from '~/components/video/VideoGrid.vue'

const route = useRoute()
const router = useRouter()

const searchInput = ref(String(route.query.search || ''))

watch(
  () => route.query.search,
  (value) => {
    searchInput.value = String(value || '')
  },
)

let debounceTimer: ReturnType<typeof setTimeout> | null = null

watch(searchInput, (value) => {
  if (debounceTimer) clearTimeout(debounceTimer)

  debounceTimer = setTimeout(() => {
    const normalized = value.trim()

    router.replace({
      query: normalized ? { search: normalized } : {},
    })
  }, 400)
})

const searchQuery = computed(() => String(route.query.search || '').trim())

const { items, pending, error, isEmpty, shouldFetch } = useVideos(searchQuery)

useSeoMeta({
  title: 'Aparat Videos',
  description: 'Search and explore Aparat videos',
})
</script>

<template>
  <section class="mx-auto max-w-7xl px-4 py-8 md:py-10">
    <div class="mb-8 space-y-4">
      <div class="space-y-2">
        <h1 class="text-2xl font-bold text-zinc-900 md:text-3xl">جستجوی ویدیوهای آپارات</h1>
        <p class="text-sm text-zinc-500">برای نمایش نتایج، حداقل ۳ کاراکتر وارد کنید.</p>
      </div>

      <AppSearchInput v-model="searchInput" placeholder="مثلاً آموزش Vue" />
    </div>

    <div v-if="!shouldFetch" class="mt-10">
      <AppEmptyState
        title="جستجو را شروع کنید"
        description="برای مشاهده نتایج، حداقل ۳ کاراکتر وارد کنید."
      />
    </div>

    <div v-else-if="pending" class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <AppSkeleton v-for="item in 6" :key="item" class="aspect-[16/12]" />
    </div>

    <div v-else-if="error">
      <AppErrorState
        title="خطا در دریافت لیست ویدیوها"
        description="لطفاً چند لحظه دیگر دوباره تلاش کنید."
      />
    </div>

    <div v-else-if="isEmpty">
      <AppEmptyState
        title="نتیجه‌ای پیدا نشد"
        description="عبارت جستجو را تغییر دهید و دوباره تلاش کنید."
      />
    </div>

    <VideoGrid v-else :items="items" />
  </section>
</template>

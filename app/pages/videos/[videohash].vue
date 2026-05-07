<script setup lang="ts">
import type { VideoDetail } from '#shared/types/video'
import { formatViewsCount } from '#shared/utils/format'
import { formatRelativeTime } from '#shared/utils/date'

const route = useRoute()

const { data, pending, error } = await useFetch<VideoDetail>(
  `/api/videos/${route.params.videohash}`,
)

const video = computed(() => data.value ?? null)

const followersText = computed(() => {
  if (!video.value) return ''
  return `${formatViewsCount(video.value.followersCount || 0)} دنبال‌کننده`
})

const viewsAndDateText = computed(() => {
  if (!video.value) return ''

  const views = `${formatViewsCount(video.value.viewsCount)} بازدید`
  const published = video.value.publishedAt ? formatRelativeTime(video.value.publishedAt) : ''

  return published ? `${views} • ${published}` : views
})

const likesText = computed(() => {
  if (!video.value) return ''
  return formatViewsCount(video.value.likesCount)
})
</script>

<template>
  <section class="border border-border-default rounded-xl p-4">
    <div v-if="pending" class="text-sm text-white">در حال دریافت اطلاعات ویدیو...</div>

    <div
      v-else-if="error"
      class="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
    >
      خطا در دریافت اطلاعات ویدیو
    </div>

    <article v-else-if="video" class="space-y-5">
      <section class="overflow-hidden rounded-lg border border-slate-200 bg-black">
        <div class="aspect-video w-full">
          <iframe
            :src="video.videoEmbedUrl"
            :title="video.title"
            class="h-full w-full"
            allow="autoplay; fullscreen"
            allowfullscreen
          />
        </div>
      </section>

      <header class="space-y-5">
        <h1 class="text-xl lg:text-2xl typography-video-title">
          {{ video.title }}
        </h1>

        <div class="flex flex-wrap items-center justify-between gap-3">
          <div class="flex flex-wrap items-center gap-3">
            <img
              :src="video.channelAvatarUrl"
              :alt="video.channelName"
              class="h-10 w-10 rounded-full object-cover"
              loading="lazy"
            />
            <div class="min-w-0">
              <p class="text-md lg:text-lg typography-channel-name">
                {{ video.channelName }}
              </p>
              <p class="text-sm lg:text-md typography-video-meta">
                {{ followersText }}
              </p>
            </div>
          </div>

          <div
            class="inline-flex h-[44px] items-center gap-[10px] rounded-[4px] bg-[#4F5154] px-[16px] py-[12px] text-sm text-white"
          >
            <span>{{ likesText }}</span>
            <IconsHeart />
          </div>
        </div>

        <div class="flex flex-wrap items-center gap-3 typography-video-meta">
          <span class="text-sm lg:text-md">{{ viewsAndDateText }} • </span>
          <VideoTagList :tags="video.tags" />
        </div>
      </header>

      <section>
        <p class="text-text-description">
          {{ video.description || 'توضیحی برای این ویدیو ثبت نشده است.' }}
        </p>
      </section>
    </article>
  </section>
</template>

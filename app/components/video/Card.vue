<script setup lang="ts">
import type { VideoListItem } from '#shared/types/video'
import { formatViewsCount } from '#shared/utils/format'
import { formatRelativeTime, formatAbsoluteTime } from '#shared/utils/date'

const props = defineProps<{
  video: VideoListItem
}>()

const imageError = ref(false)
const mounted = ref(false)

onMounted(() => {
  mounted.value = true
})

const viewsText = computed(() => `${formatViewsCount(props.video.viewsCount)} بازدید`)

const publishedTitle = computed(() => {
  if (!props.video.publishedAt) {
    return ''
  }

  return formatAbsoluteTime(props.video.publishedAt)
})

const publishedText = computed(() => {
  if (!props.video.publishedAt) {
    return ''
  }

  return mounted.value
    ? formatRelativeTime(props.video.publishedAt)
    : formatAbsoluteTime(props.video.publishedAt)
})
</script>

<template>
  <NuxtLink
    :to="`/videos/${video.videohash}`"
    class="block overflow-hidden rounded-lg border border-[#404244] transition hover:shadow-md"
  >
    <div class="space-y-4 p-4">
      <div class="relative aspect-video overflow-hidden rounded-[8px] bg-[#999C9F52]">
        <img
          v-if="!imageError"
          :src="video.thumbnailUrl"
          :alt="video.title"
          class="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
          loading="lazy"
          @error="imageError = true"
        />
        <div v-else class="absolute inset-0 overflow-hidden rounded-[8px] bg-[#999C9F52]">
          <span
            class="absolute left-1/2 top-1/2 block h-px w-[140%] -translate-x-1/2 -translate-y-1/2 rotate-[-34.79deg] bg-[#757575]"
          />
          <span
            class="absolute left-1/2 top-1/2 block h-px w-[140%] -translate-x-1/2 -translate-y-1/2 rotate-[-145.21deg] bg-[#757575]"
          />
        </div>

        <span class="absolute bottom-2 left-2 rounded-[45px] bg-[#2F3337] p-2 text-xs text-white">
          {{ formatDuration(video.duration) }}
        </span>
      </div>

      <div>
        <h3 class="line-clamp-2 text-sm font-semibold leading-6">
          {{ video.title }}
        </h3>

        <div class="mt-3 flex items-center gap-2">
          <img
            :src="video.channelAvatarUrl"
            :alt="video.channelName"
            class="h-5 w-5 rounded-full object-cover"
            loading="lazy"
            @error="($event.target as HTMLImageElement).src = '/images/channel-avatar-default.svg'"
          />
          <span class="text-sm text-[#EAEAEA]">
            {{ video.channelName }}
          </span>
        </div>

        <div class="mt-3 flex items-center gap-2 text-xs text-[#AEAEAE]">
          <span>{{ viewsText }}</span>
          <span>-</span>
          <span :title="publishedTitle">{{ publishedText }}</span>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

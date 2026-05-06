<script setup lang="ts">
import { computed } from 'vue'
import type { VideoListItem } from '#shared/types/video'
import { formatViewsCount } from '#shared/utils/format'
import { formatRelativeTime } from '#shared/utils/date'

const props = defineProps<{
  video: VideoListItem
}>()

const viewsText = computed(() => `${formatViewsCount(props.video.viewsCount)} بازدید`)

const publishedText = computed(() => {
  if (!props.video.publishedAt) {
    return ''
  }

  return formatRelativeTime(props.video.publishedAt)
})
</script>

<template>
  <NuxtLink
    :to="`/videos/${video.videohash}`"
    class="block overflow-hidden rounded-lg border border-[#404244] transition hover:shadow-md"
  >
    <div class="p-4">
      <div class="aspect-video overflow-hidden bg-zinc-100">
        <img
          v-if="video.thumbnailUrl"
          :src="video.thumbnailUrl"
          :alt="video.title"
          class="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
          loading="lazy"
        />
      </div>

      <div class="py-4">
        <h3 class="line-clamp-2 text-sm font-semibold leading-6">
          {{ video.title }}
        </h3>
        <div class="mt-3 flex items-center gap-2">
          <img
            :src="video.channelAvatarUrl"
            :alt="video.channelName"
            class="h-8 w-8 rounded-full object-cover"
            loading="lazy"
          />
          <span class="text-sm text-[#EAEAEA]">
            {{ video.channelName }}
          </span>
        </div>
        <div class="mt-3 flex items-center gap-2 text-xs text-[#AEAEAE]">
          <span>{{ viewsText }}</span>
          <span>-</span>
          <span>{{ publishedText }}</span>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

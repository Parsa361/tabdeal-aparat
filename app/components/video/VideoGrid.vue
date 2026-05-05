<script setup lang="ts">
import type { VideoListItem } from '#shared/types/video'
import VideoCard from './VideoCard.vue'

defineProps<{
  items: VideoListItem[]
}>()
</script>

<template>
  <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
    <VideoCard v-for="video in items" :key="video.videohash" :video="video" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  viewsLabel: string
  publishedDaysAgoLabel: string
  likeCount?: number | null
}>()
</script>

<template>
  <div class="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
    <span>{{ viewsLabel }}</span>
    <span>•</span>
    <span>{{ publishedDaysAgoLabel }}</span>

    <template v-if="likeCount !== null && likeCount !== undefined">
      <span>•</span>
      <span>{{ likeCount }} لایک</span>
    </template>
  </div>
</template>

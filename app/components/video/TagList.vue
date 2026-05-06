<script setup lang="ts">
type VideoTag = {
  name: string
}

defineProps<{
  tags: VideoTag[]
}>()

const buildTagLink = (tagName: string) => {
  return `/search?q=${encodeURIComponent(tagName)}`
}
</script>

<template>
  <section v-if="tags.length" class="flex flex-wrap items-center gap-2">
    <CommonAppTag
      v-for="tag in tags"
      :key="tag.name"
      :label="tag.name"
      :to="buildTagLink(tag.name)"
    />
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  label: string
  to?: string
}>()
</script>

<template>
  <NuxtLink v-if="to" :to="to" class="inline-flex text-sm text-[#2EC0FF]"> #{{ label }} </NuxtLink>

  <span v-else class="inline-flex text-sm text-[#2EC0FF]"> #{{ label }} </span>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  description?: string
}>()
</script>

<template>
  <div class="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-8 text-center">
    <h2 class="text-lg font-semibold text-zinc-900">
      {{ title }}
    </h2>
    <p v-if="description" class="mt-2 text-sm text-zinc-500">
      {{ description }}
    </p>
  </div>
</template>

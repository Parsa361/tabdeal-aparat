<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <div class="rounded-2xl border border-dashed border-zinc-300 p-8 text-center">
    <h2 class="text-lg font-semibold text-red-700">
      {{ title }}
    </h2>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
  description?: string
}>()
</script>

<template>
  <div class="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
    <h2 class="font-semibold">
      {{ title || 'خطایی رخ داده است' }}
    </h2>
    <p v-if="description" class="mt-2 text-sm">
      {{ description }}
    </p>
  </div>
</template>

<script setup lang="ts">
const modelValue = defineModel<string>({ default: '' })

defineProps<{
  placeholder?: string
  disabled?: boolean
}>()
</script>

<template>
  <div class="w-full">
    <input
      v-model="modelValue"
      type="search"
      :placeholder="placeholder || 'جستجو...'"
      :disabled="disabled"
      class="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900"
    />
  </div>
</template>

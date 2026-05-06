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
      :placeholder="placeholder || 'جستجو ویدیو...'"
      :disabled="disabled"
      class="w-full rounded-sm bg-[#3B3D3F] px-4 py-3 text-sm outline-none transition placeholder:text-white focus:border-zinc-900"
    />
  </div>
</template>

<script setup lang="ts">
const modelValue = defineModel<string>({ default: '' })

withDefaults(
  defineProps<{
    placeholder?: string
    disabled?: boolean
  }>(),
  {
    placeholder: 'جستجو ویدیو...',
    disabled: false,
  },
)
</script>

<template>
  <div class="w-full">
    <input
      v-model="modelValue"
      type="search"
      :placeholder="placeholder"
      :disabled="disabled"
      class="h-12 w-full rounded-[4px] bg-[#3B3D3F] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/70 disabled:cursor-not-allowed disabled:opacity-50"
    />
  </div>
</template>

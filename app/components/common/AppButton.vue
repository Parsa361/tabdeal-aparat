<script setup lang="ts">
withDefaults(
  defineProps<{
    label?: string
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
    loading?: boolean
    fullWidth?: boolean
    color?: string
  }>(),
  {
    label: '',
    type: 'button',
    disabled: false,
    loading: false,
    fullWidth: false,
    color: '#F0B90B',
  },
)

defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :style="{ '--btn-color': color }"
    class="inline-flex h-12 items-center justify-center gap-2 rounded-[4px] bg-[var(--btn-color)] px-4 py-3 text-sm font-medium text-[#1E1E1E] transition hover:brightness-90 disabled:cursor-not-allowed disabled:opacity-60"
    :class="{ 'w-full': fullWidth, 'w-[97px]': !fullWidth }"
    @click="$emit('click', $event)"
  >
    <slot name="icon" />

    <span v-if="label">{{ label }}</span>

    <slot v-else />
  </button>
</template>

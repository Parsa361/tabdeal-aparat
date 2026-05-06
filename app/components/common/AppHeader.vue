<script setup lang="ts">
const route = useRoute()

const shouldShowSearch = computed(() => {
  return route.meta.showHeaderSearch === true
})
</script>

<template>
  <header class="relative w-full overflow-hidden bg-header-gradient">
    <div
      class="pointer-events-none absolute rounded-full bg-[#F0B90B] header-glow"
      aria-hidden="true"
    />

    <div class="flex flex-col relative z-10 app-container">
      <div class="my-3 lg:mr-9">
        <CommonAppLogo />
      </div>

      <div v-if="shouldShowSearch" class="w-full pt-2 pb-4 lg:pb-6 lg:pt-3">
        <CommonAppSearchInput />
      </div>
    </div>
  </header>
</template>

<style scoped>
.bg-header-gradient {
  background: linear-gradient(90deg, #2c2e30 -0.76%, #0e0e0e 50%);
}

.header-glow {
  width: 200px;
  height: 152px;
  right: 80px;
  opacity: 1;
  filter: blur(90px);
}

@media (min-width: 1024px) {
  .header-glow {
    width: 200px;
    height: 152px;
    top: 43px;
    right: 356px;
    filter: blur(80px);
  }
}
</style>

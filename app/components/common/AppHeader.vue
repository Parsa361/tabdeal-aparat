<script setup lang="ts">
const route = useRoute()

const shouldShowSearch = computed(() => {
  return route.meta.showHeaderSearch === true
})

const { searchInput, submitSearch } = useHeaderSearch()

async function onSubmit() {
  await submitSearch()
}
</script>

<template>
  <header class="relative w-full overflow-hidden bg-header-gradient">
    <div
      class="pointer-events-none absolute rounded-full bg-[#F0B90B] header-glow"
      aria-hidden="true"
    />

    <div class="flex flex-col relative z-10 app-container">
      <div class="mt-3 lg:mr-9">
        <CommonAppLogo />
      </div>

      <form
        v-if="shouldShowSearch"
        class="mt-[28px] mb-6 flex w-full flex-col gap-4 sm:flex-row sm:items-center px-3 py-4 lg:p-4 rounded-lg bg-[#2C2E30]"
        @submit.prevent="onSubmit"
      >
        <div class="w-full">
          <CommonAppSearchInput v-model="searchInput" placeholder="جستجو ویدیو..." />
        </div>

        <CommonAppButton type="submit" label="جستجو">
          <template #icon>
            <IconsSearch />
          </template>
        </CommonAppButton>
      </form>
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

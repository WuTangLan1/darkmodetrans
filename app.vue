<!-- app.vue -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import OverlayLoad from '~/components/overlayLoad.vue'

const showOverlay = ref(true)

onMounted(() => {
  setTimeout(() => {
    showOverlay.value = false
  }, 2000)
})
</script>

<template>
  <ClientOnly>
    <template #placeholder>
      <div class="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center">
        <div class="w-16 h-16 bg-blacks rounded-full animate-ping"></div>
      </div>
    </template>

    <transition name="fade" mode="out-in">
      <OverlayLoad v-if="showOverlay" key="overlay" />
    </transition>
  </ClientOnly>

  <div v-show="!showOverlay">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>

  <div v-show="!showOverlay">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>

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
  <transition name="fade" mode="out-in" v-if="showOverlay" key="overlay">
    <OverlayLoad />
  </transition>
  <transition name="fade" mode="out-in" v-else key="layout">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </transition>
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

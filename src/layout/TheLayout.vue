<template>
  <a-layout style="min-height: 100vh">
    <!-- Sider -->
    <TheSider class="sider-fixed" />

    <a-layout>
      <!-- Header -->
      <TheHeader />

      <!-- Content -->
      <a-layout-content class="content-scroll">
        <TheContent />
        <ScrollToTop />
      </a-layout-content>
      <TheDrawer />
    </a-layout>
  </a-layout>
</template>

<script setup>
import TheSider from './TheSider.vue'
import TheHeader from './TheHeader.vue'
import TheContent from './TheContent.vue'
import ScrollToTop from '@/components/ScrollToTop.vue'
import TheDrawer from './TheDrawer.vue'
</script>

<style scoped>
.sider-fixed {
  height: 100vh;
}

.content-scroll {
  padding: 24px;
  overflow-y: auto;
  overflow-x: hidden;
  height: calc(100vh - 64px);
}

.content-scroll::-webkit-scrollbar {
  width: 10px;
}

.content-scroll::-webkit-scrollbar-track {
  background: #f1f1f1; /* Warna latar belakang track scrollbar */
}

.content-scroll::-webkit-scrollbar-thumb {
  background-color: #888; /* Warna thumb (bagian yang digeser) */
  border-radius: 10px;
}

.content-scroll::-webkit-scrollbar-thumb:hover {
  background-color: #555; /* Warna thumb saat dihover */
}
</style>

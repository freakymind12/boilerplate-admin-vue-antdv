<template>
  <a-flex justify="center" align="center" style="height: 80vh" vertical>
    <a-flex gap="middle" align="center" style="margin-bottom: 2rem">
      <ShieldAlert :size="200" />
      <span class="error-code">404 NOT FOUND</span>
    </a-flex>
    <span class="notes">What are you looking for, you can't find it here</span>
  </a-flex>
</template>

<script setup>
import { ShieldAlert } from 'lucide-vue-next'
</script>

<style scoped>
.error-code {
  font-size: 50px;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
.notes {
  font-size: 30px;
}
</style>

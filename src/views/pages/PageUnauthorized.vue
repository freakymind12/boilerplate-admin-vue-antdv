<template>
  <a-flex justify="center" align="center" style="height: 80vh" vertical>
    <a-flex gap="middle" align="center" style="margin-bottom: 2rem">
      <ShieldAlert :size="100" />
      <span class="error-code">401 UNAUTHORIZED</span>
    </a-flex>
    <span class="notes"
      >This page is guarded by system, and you don't have an access to it
    </span>
  </a-flex>
</template>

<script setup>
import { ShieldAlert } from 'lucide-vue-next'
</script>

<style scoped>
.error-code {
  font-size: 30px;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
.notes {
  font-size: 15px;
}
</style>

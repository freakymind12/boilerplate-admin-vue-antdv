<template>
  <a-row :gutter="[16, 16]">
    <a-col :xs="{ span: 24 }" :lg="{ span: 12 }" v-for="a in 12" :key="a">
      <BaseEchart />
    </a-col>
  </a-row>
</template>

<script setup>
import BaseEchart from '@/components/BaseEchart.vue'
</script>

<style scoped></style>

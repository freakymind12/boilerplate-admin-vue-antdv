<template>
  <a-row :gutter="[16, 16]">
    <a-col :xs="{ span: 24 }" :lg="{ span: 12 }" v-for="a in 12" :key="a">
      <a-card size="large">
        <template #title>
          <span class="header-big-font">Card title</span>
        </template>
        <template #extra>
          <MenuOutlined class="icon" />
        </template>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </a-card>
    </a-col>
  </a-row>
</template>

<script setup>
import { MenuOutlined } from '@ant-design/icons-vue'
</script>

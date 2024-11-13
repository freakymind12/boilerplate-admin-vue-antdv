<template>
  <a-col :xs="{ span: 24 }" :lg="{ span: 6 }">
    <a-card>
      <a-statistic
        :value="value"
        :suffix="suffix"
        :value-style="{ color: color }"
      >
        <template #title>
          <span class="header-big-font">{{ title }}</span>
        </template>
        <template #prefix>
          <slot name="icon"></slot>
        </template>
      </a-statistic>
    </a-card>
  </a-col>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: 'Widget Title',
  },
  value: {
    type: Number,
    default: 10000,
  },
  suffix: {
    type: String,
    default: 'Suffix',
  },
  prefix: {
    type: String,
    default: 'Prefix',
  },
  color: {
    type: String,
    default: '#000',
  },
})
</script>

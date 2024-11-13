<template>
  <a-modal v-model:open="localVisible" :footer="null">
    <template #title>
      <h3>{{ props.modalTitle }}</h3></template
    >
    <slot name="form"> </slot>
  </a-modal>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  modalTitle: {
    type: String,
    default: 'Modal Title',
  },
})
const emit = defineEmits(['close'])

const localVisible = ref(false)

// Wacthing modal props visibilitas modal
watch([() => props.visible, localVisible], ([newVisible, newLocalVisible]) => {
  if (newVisible !== localVisible.value) {
    localVisible.value = newVisible
  }
  emit('close', newLocalVisible)
})
</script>

// src/composables/useCurrentDate.js
import { ref, onMounted, onUnmounted } from 'vue'

const formatDate = date => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

export function useCurrentDate() {
  const dateNow = ref(formatDate(new Date()))

  // Update dateNow every second
  const updateDateNow = () => {
    dateNow.value = formatDate(new Date())
  }

  onMounted(() => {
    const interval = setInterval(updateDateNow, 1000)
    onUnmounted(() => {
      clearInterval(interval)
    })
  })

  return {
    dateNow,
  }
}

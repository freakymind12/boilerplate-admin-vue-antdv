<template>
  <div v-if="showButton" class="scroll-to-top" @click="scrollToTop">
    <UpCircleOutlined />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { UpCircleOutlined } from '@ant-design/icons-vue'

const showButton = ref(false)

// Function to handle scroll event
const handleScroll = () => {
  const scrollTop = document.querySelector('.content-scroll').scrollTop
  showButton.value = scrollTop > 300
}

const scrollToTop = () => {
  document.querySelector('.content-scroll').scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

let contentElement = null

onMounted(() => {
  contentElement = document.querySelector('.content-scroll')
  if (contentElement) {
    contentElement.addEventListener('scroll', handleScroll)
  }
})

onUnmounted(() => {
  if (contentElement) {
    contentElement.removeEventListener('scroll', handleScroll)
  }
})
</script>

<style scoped>
.scroll-to-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  background-color: #5a5a5a;
  color: #fff;
  padding: 10px 15px;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.3s;
  font-size: 20px;
}

.scroll-to-top:hover {
  opacity: 1;
}
</style>

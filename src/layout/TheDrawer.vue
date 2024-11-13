<template>
  <a-drawer
    v-model:open="drawerStore.open"
    placement="right"
    :closable="true"
    style="background-color: #264d8e; color: white; opacity: 1"
  >
    <template #title> <span style="color: white">Side Menu</span> </template>
    <a-flex vertical gap="middle">
      <div>
        <h3>Date Now</h3>
        <p>{{ dateNow }}</p>
      </div>
      <div>
        <h3>Translate To</h3>
        <TranslateGoogle />
      </div>
      <div>
        <h3>Your Account</h3>
        <a-flex justify="space-between" style="margin-bottom: 0.5rem">
          {{ useAuthStore().user?.username }}
          <a-tag color="green">
            {{
              useAuthStore().user?.role.replace(/^./, c => c.toUpperCase())
            }}</a-tag
          >
        </a-flex>
        <a-button
          danger
          size="large"
          type="primary"
          class="button-logout"
          @click="handleLogout"
        >
          Logout
        </a-button>
      </div>
    </a-flex>
  </a-drawer>
</template>

<script setup>
import { useDrawerStore } from '@/stores/drawer'
import { useAuthStore } from '@/stores/auth'
import { message } from 'ant-design-vue'
import { useCurrentDate } from '@/composable/currentDate'
import TranslateGoogle from '@/components/TranslateGoogle.vue'

const drawerStore = useDrawerStore()
const { dateNow } = useCurrentDate()
const handleLogout = async () => {
  try {
    await useAuthStore().logout()
    message.success('Logout Success')
    drawerStore.toggleDrawer()
  } catch (error) {
    console.error('Logout Failed', error)
    message.error('Logout Failed')
  }
}
</script>

<style scoped>
.ant-drawer-content-wrapper {
  width: 100px;
}

.button-logout {
  width: 100%;
}
</style>

<template>
  <a-layout-header class="header">
    <a-flex justify="space-between" align="center" style="height: inherit">
      <a-flex gap="middle" align="center">
        <MenuUnfoldOutlined
          v-if="siderStore.collapsed"
          class="trigger"
          @click="toggleSider"
        />
        <MenuFoldOutlined v-else class="trigger" @click="toggleSider" />

        <!-- Breadcrumb - Only show on larger screens -->
        <a-breadcrumb>
          <a-breadcrumb-item
            v-for="(breadcrumb, index) in breadcrumbs"
            :key="index"
          >
            <router-link
              v-if="index !== breadcrumbs.length - 1"
              :to="breadcrumb.path"
            >
              {{ breadcrumb.name }}
            </router-link>
            <span v-else>{{ breadcrumb.name }}</span>
          </a-breadcrumb-item>
        </a-breadcrumb>
      </a-flex>

      <!-- Right section - Translate, Date, and User Menu -->
      <a-flex justify="flex-end" gap="middle" align="center">
        <MenuOutlined
          v-if="isMobile"
          class="trigger"
          @click="drawerStore.toggleDrawer()"
        />
        <TranslateGoogle v-if="!isMobile" />

        <!-- Current date/time - Only show on larger screens -->
        <span v-show="!isMobile">
          {{ dateNow }}
        </span>

        <a-dropdown-button v-show="!isMobile">
          {{ authStore.user?.username }}
          <!-- Show only icon on mobile -->
          <template #overlay>
            <a-menu>
              <a-menu-item key="1" @click="handleLogout"> Logout </a-menu-item>
            </a-menu>
          </template>
          <template #icon><UserOutlined /></template>
        </a-dropdown-button>
      </a-flex>
    </a-flex>
  </a-layout-header>
</template>

<script setup>
import { ref, watch, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { message } from 'ant-design-vue'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  MenuOutlined,
} from '@ant-design/icons-vue'
import TranslateGoogle from '@/components/TranslateGoogle.vue'
import { useSiderStore } from '@/stores/sidebar'
import { useAuthStore } from '@/stores/auth'
import { useDrawerStore } from '@/stores/drawer'
import { useCurrentDate } from '@/composable/currentDate'

// User data
const { dateNow } = useCurrentDate()
const siderStore = useSiderStore()
const drawerStore = useDrawerStore()
const authStore = useAuthStore()

const isMobile = ref(window.innerWidth <= 950)

const handleResize = () => {
  isMobile.value = window.innerWidth <= 950
}

window.addEventListener('resize', handleResize)
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

// Breadcrumbs
const route = useRoute()
const breadcrumbs = ref([])

const getBreadcrumbs = () => {
  const matchedRoutes = route.matched
  return matchedRoutes.map(route => ({
    name: route.meta.breadcrumb || route.name,
    path: route.path,
  }))
}

breadcrumbs.value = getBreadcrumbs()

watch(route, () => {
  breadcrumbs.value = getBreadcrumbs()
})

const handleLogout = async () => {
  try {
    await authStore.logout()
    message.success('Logout Success')
  } catch (error) {
    console.error('Logout Failed', error)
    message.error('Logout Failed')
  }
}

const toggleSider = () => {
  if (!siderStore.hidden && !siderStore.isMobile) {
    siderStore.toggleCollapse()
  } else {
    siderStore.toggleHidden()
    siderStore.toggleCollapse()
  }
}
</script>

<style scoped>
.trigger {
  font-size: 16px;
}

.trigger:hover {
  color: #1890ff;
}

.header {
  padding-left: 20px;
  padding-right: 20px;
  background-color: #fff;
  color: black;
  border-bottom: 1px solid #ccc;
}

@media (max-width: 768) {
  .header {
    padding-left: 10px;
    padding-right: 10px;
  }

  .trigger {
    font-size: 18px;
  }
}
</style>

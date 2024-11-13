<template>
  <a-layout-sider
    collapsible
    :trigger="null"
    v-model:collapsed="siderStore.collapsed"
    theme="light"
    class="sider"
    v-show="!siderStore.hidden"
  >
    <a-flex vertical>
      <div class="logo">
        <a-image
          :width="70"
          src="/src/assets/images/hrs.png"
          :preview="false"
        />
      </div>
      <div class="menu-container">
        <a-menu theme="light" mode="inline">
          <template v-for="item in menuItems">
            <a-menu-item
              v-if="!item.children"
              :key="item.key"
              :to="item.path"
              custom
            >
              <router-link
                :to="item.path"
                style="display: flex; align-items: center"
              >
                <component :is="item.icon" />
                <span>{{ item.title }}</span>
              </router-link>
            </a-menu-item>

            <template v-else>
              <a-sub-menu :key="item.key">
                <template #title>
                  <component :is="item.icon" />
                  <span>{{ item.title }}</span>
                </template>

                <a-menu-item
                  v-for="child in item.children"
                  :key="child.key"
                  :to="child.path"
                  custom
                >
                  <router-link
                    :to="child.path"
                    style="display: flex; align-items: center"
                  >
                    <component :is="child.icon" />
                    <span>{{ child.title }}</span>
                  </router-link>
                </a-menu-item>
              </a-sub-menu>
            </template>
          </template>
        </a-menu>
      </div>
      <a-flex justify="center" v-if="!siderStore.collapsed"> </a-flex>
    </a-flex>
  </a-layout-sider>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import {
  UserOutlined,
  DashboardOutlined,
  DatabaseOutlined,
  FileOutlined,
} from '@ant-design/icons-vue'
import SiderMenu from './sider.js'
import { useSiderStore } from '@/stores/sidebar.js'

// Menerjemahkan nama icon dari string ke komponen icon
const iconMap = {
  DashboardOutlined,
  UserOutlined,
  DatabaseOutlined,
  FileOutlined,
}

const siderStore = useSiderStore()

const menuItems = ref(
  SiderMenu.map(item => ({
    ...item,
    icon: iconMap[item.icon],
  })),
)

const handleResize = () => {
  if (window.innerWidth < 768) {
    siderStore.setCollapse(true)
    siderStore.setHidden(true)
    siderStore.setIsMobile(true)
  } else {
    siderStore.setHidden(false)
    siderStore.setIsMobile(false)
  }
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.logo {
  height: 32px;
  margin: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-name {
  color: white;
  font-size: 14px;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
}

.sider {
  border-right: 1px solid #ccc;
}

.menu-container {
  height: calc(100vh - 64px);
  overflow-y: auto;
  overflow-x: hidden;
}

.menu-container::-webkit-scrollbar {
  width: 4px; /* Lebar scrollbar */
}

.menu-container::-webkit-scrollbar-thumb {
  background-color: #888; /* Warna scrollbar */
  border-radius: 10px; /* Membuat scrollbar lebih bulat */
}

.menu-container::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}

.menu-container::-webkit-scrollbar-track {
  background-color: #fafafa;
  border-radius: 10px;
}
</style>

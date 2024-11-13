<template>
  <div>
    <!-- WIDGET -->
    <a-row :gutter="[16, 16]">
      <BaseWidget
        suffix="Persons"
        title="Total User"
        :value="userStore.totalUsers.total"
      >
        <template #icon> <UsergroupAddOutlined /> </template>
      </BaseWidget>
      <BaseWidget
        suffix="Persons"
        title="Admin Role"
        :value="userStore.totalUsers.admin"
      >
        <template #icon> <UserOutlined /> </template>
      </BaseWidget>
      <BaseWidget
        suffix="Persons"
        title="Staff Role"
        :value="userStore.totalUsers.staff"
      >
        <template #icon> <UserOutlined /> </template>
      </BaseWidget>
      <BaseWidget
        suffix="Persons"
        title="Viewer Role"
        :value="userStore.totalUsers.viewer"
      >
        <template #icon> <UserOutlined /> </template>
      </BaseWidget>
    </a-row>
    <!-- TABLE -->
    <a-row :gutter="[16, 16]">
      <a-col :xs="{ span: 24 }" :lg="{ span: 24 }">
        <BaseTable
          :download-menu="true"
          :action-table="true"
          table-title="User Account Control"
          :cols="cols"
          :data="userStore.usersList"
          @edit-item="handleEdit"
          @delete-item="handleDelete"
        >
        </BaseTable>
      </a-col>
    </a-row>
    <!-- MODAL FORM -->
    <BaseModalForm
      :visible="visible"
      @close="handleClose"
      :modal-title="modal.title"
    >
      <template #form>
        <AdminForm :data="modal.data" :mode="modal.mode" />
      </template>
    </BaseModalForm>
  </div>
</template>

<script setup>
import { UserOutlined, UsergroupAddOutlined } from '@ant-design/icons-vue'
import { useUserStore } from '@/stores/user'
import { onMounted, ref } from 'vue'
import BaseModalForm from '@/components/BaseModalForm.vue'
import BaseWidget from '../../components/BaseWidget.vue'
import BaseTable from '@/components/BaseTable.vue'
import AdminForm from './component/AdminForm.vue'

const userStore = useUserStore()
const cols = ref([
  {
    field: 'username',
    title: 'Username',
    sort: true,
  },
  {
    field: 'email',
    title: 'Email',
    sort: true,
  },
  {
    field: 'roles',
    title: 'Role',
    sort: true,
  },
  {
    field: 'created_at',
    title: 'Created At',
    sort: true,
  },
  {
    field: 'updated_at',
    title: 'Updated At',
    sort: true,
  },

  {
    field: 'actions',
    title: 'Actions',
    sort: false,
  },
])
const visible = ref(false)
const modal = ref({
  title: '',
  data: null,
  mode: '',
})

const handleEdit = item => {
  visible.value = !visible.value
  modal.value.title = 'Edit Data'
  modal.value.data = item
  modal.value.mode = 'edit'
}

const handleDelete = item => {
  visible.value = !visible.value
  modal.value.title = 'Delete Data'
  modal.value.data = item
  modal.value.mode = 'delete'
}

const handleClose = isVisible => {
  visible.value = isVisible
}
onMounted(() => {
  userStore.fetchUsers()
})
</script>

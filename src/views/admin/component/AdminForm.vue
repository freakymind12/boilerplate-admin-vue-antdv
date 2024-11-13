<template>
  <a-form layout="vertical" :model="form" @finish="handleAction(props.mode)">
    <a-form-item label="Username" name="username">
      <a-input
        placeholder="Username"
        v-model:value="form.username"
        :disabled="mode != 'add'"
      />
    </a-form-item>
    <a-form-item label="Email" name="email">
      <a-input
        placeholder="Email"
        v-model:value="form.email"
        :disabled="mode != 'add'"
      />
    </a-form-item>
    <a-form-item label="Role" name="role">
      <a-select
        v-model:value="form.role"
        placeholder="Role"
        :disabled="props.mode === 'delete'"
      >
        <a-select-option value="admin">ADMIN</a-select-option>
        <a-select-option value="staff">STAFF</a-select-option>
        <a-select-option value="viewer">VIEWER</a-select-option>
      </a-select>
    </a-form-item>
    <a-alert
      message="If you submit it will delete the above data from the database"
      type="warning"
      show-icon
      v-if="props.mode == 'delete'"
      style="margin-bottom: 1rem"
    />
    <a-form-item>
      <a-flex justify="flex-end">
        <a-space :size="10">
          <a-button
            type="primary"
            html-type="submit"
            :disabled="!form.username || !form.email || !form.role"
            :style="{
              backgroundColor:
                props.mode === 'delete'
                  ? '#cf1323'
                  : props.mode === 'add'
                    ? '#5daa8d'
                    : '#1890ff',
            }"
          >
            Submit
          </a-button>
        </a-space>
      </a-flex>
    </a-form-item>
  </a-form>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const props = defineProps({
  mode: {
    type: String,
    default: 'edit',
  },
  data: {
    type: Object,
    default: () => ({}),
  },
})

const form = ref({
  email: props.data?.email || '',
  username: props.data?.username || '',
  role: props.data?.roles || '',
})

watch(
  () => props.data,
  newData => {
    if (newData) {
      form.value.email = newData.email
      form.value.username = newData.username
      form.value.role = newData.roles
    }
  },
  { immediate: true },
)

const handleAction = mode => {
  if (mode == 'edit') {
    userStore.updateRole(props.data?.id_user, form.value.role)
  }

  if (mode == 'delete') {
    userStore.deleteUser(props.data.id_user)
  }
}
</script>

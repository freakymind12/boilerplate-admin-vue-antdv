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
      <a-radio-group
        v-model:value="form.role"
        :disabled="props.mode === 'delete' || props.data.roles === 'admin'"
        placeholder="Role"
      >
        <a-radio value="admin"><a-tag color="green">ADMIN</a-tag></a-radio>
        <a-radio value="staff"><a-tag color="purple">STAFF</a-tag></a-radio>
        <a-radio value="viewer"><a-tag color="volcano">VIEWER</a-tag></a-radio>
      </a-radio-group>
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
const emit = defineEmits(['close'])
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
  emit('close')
}
</script>

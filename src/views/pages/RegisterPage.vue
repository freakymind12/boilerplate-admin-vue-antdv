<template>
  <a-flex justify="center" align="center" class="register-container">
    <a-card class="register-card">
      <a-flex justify="flex-end">
        <TranslateGoogle />
      </a-flex>
      <a-flex justify="center" align="center" gap="small" vertical>
        <a-flex justify="center" align="center" gap="large">
          <a-image :src="hrs" :width="100" :preview="false" />
          <h2 :class="{ 'logo-name': true, 'intro-active': isActive }">
            Judul<br />
            Sub Judul
          </h2>
        </a-flex>
        <p style="font-size: 1rem; color: gray; margin-bottom: 0px">
          Fill this form to register new account
        </p>
      </a-flex>
      <a-form :model="form" @finish="handleRegister" layout="vertical">
        <a-form-item
          label="Username"
          name="username"
          :rules="[{ required: true, message: 'Please input your username!' }]"
        >
          <a-input v-model:value="form.username" placeholder="Username" />
        </a-form-item>

        <a-form-item
          label="Email"
          name="email"
          :rules="[{ required: true, message: 'Please input your email!' }]"
        >
          <a-input v-model:value="form.email" placeholder="Email" />
        </a-form-item>

        <a-form-item
          label="Password"
          name="password"
          :rules="[{ required: true, message: 'Please input your password!' }]"
        >
          <a-input-password
            v-model:value="form.password"
            placeholder="Password"
          />
        </a-form-item>

        <a-form-item
          label="Re-type Password"
          name="retype_password"
          :rules="[{ required: true, message: 'Please retype your password!' }]"
        >
          <a-input-password
            v-model:value="form.retype_password"
            placeholder="Password"
          />
        </a-form-item>

        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            block
            :disabled="
              form.email === '' ||
              form.password === '' ||
              form.retype_password === ''
            "
          >
            Register
          </a-button>
        </a-form-item>
      </a-form>
      <p style="color: gray; text-align: center">
        Already have an account ?
        <router-link to="/login" class="ant-link"> Sign in</router-link>
      </p>
    </a-card>
  </a-flex>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { notification, message } from 'ant-design-vue'
import { h } from 'vue'
import { LoadingOutlined } from '@ant-design/icons-vue'
import hrs from '@/assets/images/hrs.png'
import TranslateGoogle from '@/components/TranslateGoogle.vue'

const form = ref({
  username: '',
  email: '',
  password: '',
  retype_password: '',
})
const errorMessage = ref('')
const isActive = ref(false)
const router = useRouter()

onMounted(() => {
  setTimeout(() => {
    isActive.value = true
  }, 100)
})

const handleRegister = async () => {
  try {
    if (form.value.password !== form.value.retype_password) {
      errorMessage.value = 'password and retype password do not match'
      return
    }
    await axios.post('http://localhost:5010/api/users/signup', {
      username: form.value.username,
      email: form.value.email,
      password: form.value.password,
    })
    openNotification('topRight')
    setTimeout(() => {
      router.push('/login')
    }, 3000)
  } catch (error) {
    const message = error.response?.data?.message
    errorMessage.value = Array.isArray(message)
      ? message[0].msg
      : message || 'An unexpected error occurred.'
    info()
    console.error('Register failed:', error)
  }
}

const openNotification = placement => {
  notification.open({
    message: `Register Success`,
    description: `Wait a seconds it won't take long to direct you to the login page`,
    placement,
    duration: 3.5,
    icon: h(LoadingOutlined, {
      style: 'color: #108ee9',
    }),
  })
}

const info = () => {
  message.error(errorMessage.value)
}
</script>

<style scoped>
.register-container {
  height: 100vh;
  background: #f0f2f5;
}

.register-card {
  padding: 5px;
  border-radius: 8px;
  width: 30%;
}

.register-card .ant-card-body {
  padding: 0;
}

.a-button {
  width: 100%;
}

.ant-link {
  color: #000000; /* Ant Design default link color */
  text-decoration: none; /* Remove underline */
  font-weight: 600;
}
.ant-link:hover {
  text-decoration: underline; /* Underline on hover */
}

.logo-name {
  margin-bottom: 0px;
  font-family: monospace;
  font-weight: 600;
  opacity: 0; /* Start with hidden */
  transform: scale(0.8); /* Mulai dengan ukuran lebih kecil */
  transition:
    opacity 0.8s ease-out,
    transform 0.8s ease-out;
}

.logo-name.intro-active {
  opacity: 1; /* Setelah kelas ditambahkan, elemen terlihat */
  transform: scale(1); /* Kembali ke ukuran normal */
}
</style>

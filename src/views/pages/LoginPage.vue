<template>
  <a-flex justify="center" align="center" class="register-container">
    <a-card class="register-card">
      <a-flex justify="flex-end">
        <TranslateGoogle />
      </a-flex>
      <a-flex justify="center" align="center" gap="small" vertical>
        <a-flex justify="center" align="center" gap="large" class="logo-img">
          <a-image :src="hrs" :width="100" :preview="false" />
          <h2 :class="{ 'logo-name': true, 'intro-active': isActive }">
            Judul<br />
            Sub Judul
          </h2>
        </a-flex>
        <p style="font-size: 1rem; color: gray; margin-bottom: 0px">
          Login with your account
        </p>
      </a-flex>
      <a-form
        :model="form"
        @finish="auth.login(form.email, form.password)"
        layout="vertical"
      >
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
        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            block
            :disabled="form.email === '' || form.password === ''"
          >
            Login
          </a-button>
        </a-form-item>
      </a-form>
      <p align="center" style="color: gray">
        Don't have an account ?
        <router-link to="/register" class="ant-link"> Sign up</router-link>
      </p>
    </a-card>
  </a-flex>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import hrs from '@/assets/images/hrs.png'
import TranslateGoogle from '@/components/TranslateGoogle.vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const form = ref({
  email: '',
  password: '',
})

// Variable untuk mengatur status animasi
const isActive = ref(false)

onMounted(() => {
  // Set `isActive` menjadi true setelah mount untuk memicu animasi
  setTimeout(() => {
    isActive.value = true
  }, 100)
})

onUnmounted(() => {
  isActive.value = false
  console.log(isActive.value)
})
</script>

<style scoped>
.register-container {
  height: 100dvh;
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
  color: #000000;
  text-decoration: none;
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

.logo-img:hover {
  cursor: pointer;
}
</style>

import { createRouter, createWebHistory } from 'vue-router'
import TheLayout from '@/layout/TheLayout.vue'
import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: TheLayout,
    redirect: '/dashboard',
    meta: { breadcrumb: 'Home' },
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/LiveDashboard.vue'),
        meta: {
          requiresAuth: true,
          roles: ['admin', 'staff', 'viewer'],
          breadcrumb: 'Live Dashboard',
        },
      },
      {
        path: '/dashboard/parameter',
        name: 'Live Parameters',
        component: () => import('@/views/dashboard/LiveParameter.vue'),
        meta: {
          requiresAuth: true,
          roles: ['admin', 'staff', 'viewer'],
          breadcrumb: 'Live Parameter',
        },
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('@/views/about/About.vue'),
        meta: {
          requiresAuth: true,
          roles: ['admin', 'staff', 'viewer'],
          breadcrumb: 'About',
        },
      },
      {
        path: '/master',
        name: 'Master',
        redirect: '/master-production',
        meta: { breadcrumb: 'Master' },
        children: [
          {
            path: '/master-production',
            name: 'Master Production',
            component: () => import('@/views/master/ProductionLayout.vue'),
            meta: {
              requiresAuth: true,
              roles: ['admin', 'staff', 'viewer'],
              breadcrumb: 'Production',
            },
          },
        ],
      },
      {
        path: '/admin',
        name: 'Admin',
        redirect: '/account-control',
        meta: { breadcrumb: 'Admin' },
        children: [
          {
            path: '/account-control',
            name: 'Account Control',
            component: () => import('@/views/admin/accountControl.vue'),
            meta: {
              requiresAuth: true,
              roles: ['admin'],
              breadcrumb: 'Account Control',
            },
          },
        ],
      },
      {
        path: '/forbidden',
        name: 'Unauthorized',
        component: () => import('@/views/pages/PageUnauthorized.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/pages/NotFound.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/pages/RegisterPage.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/pages/LoginPage.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  // Pastikan status autentikasi diperiksa ulang setelah refresh
  if (to.meta.requiresAuth) {
    if (!authStore.isAuthenticated) {
      return next({ name: 'Login' })
    }

    if (to.meta.roles && !to.meta.roles.includes(authStore.user?.role)) {
      return next({ name: 'Unauthorized' })
    }
  }
  next()
})

export default router

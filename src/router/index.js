import { createRouter, createWebHistory } from 'vue-router'
import InvitationView from '../views/InvitationView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'invitation',
      component: InvitationView
    },
    {
      path: '/admin/login',
      name: 'admin-login',
      component: () => import('../views/admin/LoginView.vue')
    },
    {
      path: '/admin',
      name: 'admin-dashboard',
      meta: { requiresAuth: true },
      component: () => import('../views/admin/DashboardView.vue')
    },
    {
      path: '/admin/scanner',
      name: 'admin-scanner',
      meta: { requiresAuth: true },
      component: () => import('../views/admin/ScannerView.vue')
    }
  ]
})

// Route Guard
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      next('/admin/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router

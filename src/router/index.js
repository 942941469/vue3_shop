import { createRouter, createWebHashHistory } from 'vue-router'
import { getCache } from '@/utils/token/cache'

const routes = [
  {
    path: '/login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/Home.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    const token = getCache('token')
    // 如果token为空则跳转到登录页
    if (!token) {
      return next('/login')
    }
  }
  next()
})
export default router

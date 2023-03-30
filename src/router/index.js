import { createRouter, createWebHashHistory } from 'vue-router'
import { getCache } from '@/utils/token/cache'

const routes = [
  {
    path: '/login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/',
    name: 'home',
    redirect: 'main',
    component: () => import('@/views/Home.vue'),
    children: [
      {
        path: 'main',
        component: () => import('@/views/Main.vue'),
        meta: {
          title: '后台首页'
        }
      },
      {
        path: 'users',
        component: () => import('@/views/Users.vue'),
        meta: {
          title: '用户列表'
        }
      },
      {
        path: 'roles',
        component: () => import('@/views/Roles.vue'),
        meta: {
          title: '角色列表'
        }
      },
      {
        path: 'rights',
        component: () => import('@/views/Rights.vue'),
        meta: {
          title: '权限列表'
        }
      },
      {
        path: 'goods',
        component: () => import('@/views/Goods.vue'),
        meta: {
          title: '商品列表'
        }
      },
      {
        path: 'params',
        component: () => import('@/views/Params.vue'),
        meta: {
          title: '分类参数'
        }
      },
      {
        path: 'categories',
        component: () => import('@/views/Categories.vue'),
        meta: {
          title: '商品分类'
        }
      },
      {
        path: 'orders',
        component: () => import('@/views/Orders.vue'),
        meta: {
          title: '订单列表'
        }
      },
      {
        path: 'reports',
        component: () => import('@/views/Reports.vue'),
        meta: {
          title: '数据报表'
        }
      },
      {
        path: 'beautiful',
        component: () => import('@/views/Beautiful.vue'),
        meta: {
          title: '页面美化'
        }
      }
    ]
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

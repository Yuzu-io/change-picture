import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path:'/',
    redirect:'/spell'
  },
  // 登录
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  // 首页
  {
    path:'/home',
    name:'home',
    component:()=>import('@/views/home/index.vue')
  },
  // 抠图
  {
    path: '/cutout',
    name: 'cutout',
    component: () => import('@/views/cutout/index.vue')
  },
  // 咒语
  {
    path: '/spell',
    name: 'spell',
    component: () => import('@/views/spell/index.vue')
  },
  // 炼丹结果
  {
    path: '/achievements',
    name: 'achievements',
    component: () => import('@/views/achievements/index.vue')
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router

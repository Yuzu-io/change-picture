import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path:'/',
    redirect:'/spell'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path:'/home',
    name:'home',
    component:()=>import('@/views/home/index.vue')
  },
  {
    path: '/cutout',
    name: 'cutout',
    component: () => import('@/views/cutout/index.vue')
  },
  {
    path: '/spell',
    name: 'spell',
    component: () => import('@/views/spell/index.vue')
  },
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

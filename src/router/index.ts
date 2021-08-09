import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import KampvisumHome from '@/views/KampvisumHome.vue'

const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/kampvisum-home' },
  {
    path: '/kampvisum-home',
    name: 'Kampvisum Home',
    component: KampvisumHome,
    meta: {
      // requiresOpenIdAuth: true,
      homescreen: '/kampvisum-home',
      titleKey: 'page-titles.kampvisum',
    },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router

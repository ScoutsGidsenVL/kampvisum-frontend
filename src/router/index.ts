import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import KampvisumHome from '@/views/KampvisumHome.vue'
import CampOverview from '@/views/CampOverview.vue'
import Planning from '@/views/Planning.vue'
import StartView from '@/components/start.vue'

const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/start' },
  {
    path: '/start',
    name: 'Start',
    component: StartView,
  },
  {
    path: '/kampvisum-home',
    name: 'Kampvisum Home',
    component: KampvisumHome,
    meta: {
      requiresOpenIdAuth: true,
      homescreen: '/kampvisum-home',
      titleKey: 'page-titles.kampvisum',
    },
  },
  {
    path: '/kamp/:id?',
    name: 'Kamp',
    component: CampOverview,
    meta: {
      requiresOpenIdAuth: true,
      homescreen: '/kampvisum-home',
    },
  },
  {
    path: '/kamp/:id?/planning/:id?',
    name: 'Planning',
    component: Planning,
    meta: {
      requiresOpenIdAuth: true,
      homescreen: '/kampvisum-home',
    },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router

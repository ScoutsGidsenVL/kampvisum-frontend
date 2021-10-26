import CommunicationAppointments from '@/views/categories/CommunicationAppointments.vue'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import MembersLeadership from '@/views/categories/MembersLeadership.vue'
import Logistics from '@/views/categories/Logistics.vue'
import Planning from '@/views/categories/Planning.vue'
import KampvisumHome from '@/views/KampvisumHome.vue'
import CampOverview from '@/views/CampOverview.vue'
import Budget from '@/views/categories/Budget.vue'
import Safety from '@/views/categories/Safety.vue'
import StartView from '@/components/start.vue'
import BaseCategoryView from '@/views/categories/BaseCategoryView.vue'

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
    path: '/kamp/:campId?',
    name: 'Kamp',
    component: CampOverview,
    meta: {
      requiresOpenIdAuth: true,
      homescreen: '/kampvisum-home',
    },
  },
  {
    path: '/kamp/:campId?/planning/:id?',
    name: 'Planning',
    // component: Planning,
    component: BaseCategoryView,
    meta: {
      requiresOpenIdAuth: true,
      homescreen: '/kampvisum-home',
    },
  },
  {
    path: '/kamp/:campId?/logistiek/:id?',
    name: 'Logistiek',
    // component: Logistics,
    component: BaseCategoryView,
    meta: {
      requiresOpenIdAuth: true,
      homescreen: '/kampvisum-home',
    },
  },
  {
    path: '/kamp/:campId?/communicatie & afspraken/:id?',
    name: 'Communicatie & afspraken',
    // component: CommunicationAppointments,
    component: BaseCategoryView,
    meta: {
      requiresOpenIdAuth: true,
      homescreen: '/kampvisum-home',
    },
  },
  {
    path: '/kamp/:campId?/veiligheid/:id?',
    name: 'Veiligheid',
    // component: Safety,
    component: BaseCategoryView,
    meta: {
      requiresOpenIdAuth: true,
      homescreen: '/kampvisum-home',
    },
  },
  {
    path: '/kamp/:campId?/leden & leiding/:id?',
    name: 'Leden & leiding',
    // component: MembersLeadership,
    component: BaseCategoryView,
    meta: {
      requiresOpenIdAuth: true,
      homescreen: '/kampvisum-home',
    },
  },
  {
    path: '/kamp/:campId?/budget/:id?',
    name: 'Budget',
    // component: Budget,
    component: BaseCategoryView,
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

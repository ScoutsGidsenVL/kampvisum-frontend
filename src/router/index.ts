import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import BaseCategoryView from '@/views/categories/BaseCategoryView.vue'
import SettingsOverview from '@/views/SettingsOverview.vue'
import DocumentsOverview from '@/views/DocumentsOverview.vue'
import LocationsOverview from '@/views/LocationsOverview.vue'
import NonMembersOverview from '@/views/NonMembersOverview.vue'

import KampvisumHome from '@/views/KampvisumHome.vue'
import CampOverview from '@/views/CampOverview.vue'
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
    path: '/instellingen',
    name: 'Settings',
    component: SettingsOverview,
    meta: {
      requiresOpenIdAuth: true,
      homescreen: '/instellingen',
      titleKey: 'page-titles.settings',
    },
  },
  {
    path: '/documenten',
    name: 'Documents',
    component: DocumentsOverview,
    meta: {
      requiresOpenIdAuth: true,
      homescreen: '/documenten',
      titleKey: 'page-titles.documents',
    },
  },
  {
    path: '/locaties',
    name: 'Locations',
    component: LocationsOverview,
    meta: {
      requiresOpenIdAuth: true,
      homescreen: '/locaties',
      titleKey: 'page-titles.locations',
    },
  },
  {
    path: '/niet-leden',
    name: 'NonMembers',
    component: NonMembersOverview,
    meta: {
      requiresOpenIdAuth: true,
      homescreen: '/niet-leden',
      titleKey: 'page-titles.non-members',
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

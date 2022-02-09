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
    component: BaseCategoryView,
    meta: {
      title: 'Planning',
      requiresOpenIdAuth: true,
      homescreen: '/kampvisum-home',
    },
  },
  {
    path: '/kamp/:campId?/logistiek/:id?',
    name: 'Logistiek',
    component: BaseCategoryView,
    meta: {
      title: 'Logistiek',
      requiresOpenIdAuth: true,
      homescreen: '/kampvisum-home',
    }
  },
  {
    path: '/kamp/:campId?/communicatie & afspraken/:id?',
    name: 'Communicatie & afspraken',
    component: BaseCategoryView,
    meta: {
      title: 'Communicatie & afspraken',
      requiresOpenIdAuth: true,
      homescreen: '/kampvisum-home',
    },
  },
  {
    path: '/kamp/:campId?/communicatie%20&%20afspraken/:id?',
    name: 'Communicatie & afspraken ',
    component: BaseCategoryView,
    meta: {
      title: 'Communicatie & afspraken',
      requiresOpenIdAuth: true,
      homescreen: '/kampvisum-home',
    },
  },
  {
    path: '/kamp/:campId?/veiligheid/:id?',
    name: 'Veiligheid',
    component: BaseCategoryView,
    meta: {
      title: 'Veiligheid',
      requiresOpenIdAuth: true,
      homescreen: '/kampvisum-home',
    },
  },
  {
    path: '/kamp/:campId?/leden & leiding/:id?',
    name: 'Leden & leiding',
    component: BaseCategoryView,
    meta: {
      title: 'Leden & leiding',
      requiresOpenIdAuth: true,
      homescreen: '/kampvisum-home',
    },
  },
  {
    path: '/kamp/:campId?/leden%20&%20leiding/:id?',
    name: 'Leden & leiding ',
    component: BaseCategoryView,
    meta: {
      title: 'Leden & leiding',
      requiresOpenIdAuth: true,
      homescreen: '/kampvisum-home',
    },
  },
  {
    path: '/kamp/:campId?/budget/:id?',
    name: 'Budget',
    component: BaseCategoryView,
    meta: {
      title: 'Budget',
      requiresOpenIdAuth: true,
      homescreen: '/kampvisum-home',
    },
  },
  // SECTIONS
  {
    path: '/kamp/:campId?/planning/:id?/section/:sectionId',
    name: 'Planning Sections',
    component: BaseCategoryView,
    meta: {
      title: 'Planning',
      requiresOpenIdAuth: true,
      homescreen: '/kampvisum-home',
    },
  },
  {
    path: '/kamp/:campId?/logistiek/:id?/section/:sectionId',
    name: 'Logistiek Sections',
    component: BaseCategoryView,
    meta: {
      title: 'Logistiek',
      requiresOpenIdAuth: true,
      homescreen: '/kampvisum-home',
    }
  },
  {
    path: '/kamp/:campId?/communicatie & afspraken/:id?/section/:sectionId',
    name: 'Communicatie & afspraken Sections',
    component: BaseCategoryView,
    meta: {
      title: 'Communicatie & afspraken',
      requiresOpenIdAuth: true,
      homescreen: '/kampvisum-home',
    },
  },
  {
    path: '/kamp/:campId?/communicatie%20&%20afspraken/:id?/section/:sectionId',
    name: 'Communicatie & afspraken Sections',
    component: BaseCategoryView,
    meta: {
      title: 'Communicatie & afspraken',
      requiresOpenIdAuth: true,
      homescreen: '/kampvisum-home',
    },
  },
  {
    path: '/kamp/:campId?/veiligheid/:id?/section/:sectionId',
    name: 'Veiligheid Sections',
    component: BaseCategoryView,
    meta: {
      title: 'Veiligheid',
      requiresOpenIdAuth: true,
      homescreen: '/kampvisum-home',
    },
  },
  {
    path: '/kamp/:campId?/leden & leiding/:id?/section/:sectionId',
    name: 'Leden & leiding Sections',
    component: BaseCategoryView,
    meta: {
      title: 'Leden & leiding',
      requiresOpenIdAuth: true,
      homescreen: '/kampvisum-home',
    },
  },
  {
    path: '/kamp/:campId?/leden%20&%20leiding/:id?/section/:sectionId',
    name: 'Leden & leiding Sections',
    component: BaseCategoryView,
    meta: {
      title: 'Leden & leiding',
      requiresOpenIdAuth: true,
      homescreen: '/kampvisum-home',
    },
  },
  {
    path: '/kamp/:campId?/budget/:id?/section/:sectionId',
    name: 'Budget Sections',
    component: BaseCategoryView,
    meta: {
      title: 'Budget',
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

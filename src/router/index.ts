import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from 'vue-router'
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
    name: 'planning',
    component: BaseCategoryView,
    meta: {
      title: 'Planning',
      requiresOpenIdAuth: true,
      homescreen: '/kampvisum-home',
    },
  },
  {
    path: '/kamp/:campId?/logistics/:id?',
    name: 'logistics',
    component: BaseCategoryView,
    meta: {
      title: 'Logistiek',
      requiresOpenIdAuth: true,
      homescreen: '/kampvisum-home',
    }
  },
  {
    path: '/kamp/:campId?/communication_agreements/:id?',
    name: 'communication_agreements',
    component: BaseCategoryView,
    meta: {
      title: 'Communicatie & afspraken',
      requiresOpenIdAuth: true,
      homescreen: '/kampvisum-home',
    },
  },
  {
    path: '/kamp/:campId?/safety/:id?',
    name: 'safety',
    component: BaseCategoryView,
    meta: {
      title: 'Veiligheid',
      requiresOpenIdAuth: true,
      homescreen: '/kampvisum-home',
    },
  },
  {
    path: '/kamp/:campId?/members_leaders/:id?',
    name: 'members_leaders',
    component: BaseCategoryView,
    meta: {
      title: 'Leden & leiding',
      requiresOpenIdAuth: true,
      homescreen: '/kampvisum-home',
    },
  },
  {
    path: '/kamp/:campId?/budget/:id?',
    name: 'budget',
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
    name: 'planning section',
    component: BaseCategoryView,
    meta: {
      title: 'Planning',
      requiresOpenIdAuth: true,
      homescreen: '/kampvisum-home',
    },
  },
  {
    path: '/kamp/:campId?/logistics/:id?/section/:sectionId',
    name: 'logistics section',
    component: BaseCategoryView,
    meta: {
      title: 'Logistiek',
      requiresOpenIdAuth: true,
      homescreen: '/kampvisum-home',
    }
  },
  {
    path: '/kamp/:campId?/communication_agreements/:id?/section/:sectionId',
    name: 'communication_agreements section',
    component: BaseCategoryView,
    meta: {
      title: 'Communicatie & afspraken',
      requiresOpenIdAuth: true,
      homescreen: '/kampvisum-home',
    },
  },
  {
    path: '/kamp/:campId?/safety/:id?/section/:sectionId',
    name: 'safety section',
    component: BaseCategoryView,
    meta: {
      title: 'Veiligheid',
      requiresOpenIdAuth: true,
      homescreen: '/kampvisum-home',
    },
  },
  {
    path: '/kamp/:campId?/members_leaders/:id?/section/:sectionId',
    name: 'members_leaders section',
    component: BaseCategoryView,
    meta: {
      title: 'Leden & leiding',
      requiresOpenIdAuth: true,
      homescreen: '/kampvisum-home',
    },
  },
  {
    path: '/kamp/:campId?/budget/:id?/section/:sectionId',
    name: 'buget section',
    component: BaseCategoryView,
    meta: {
      title: 'Budget',
      requiresOpenIdAuth: true,
      homescreen: '/kampvisum-home',
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

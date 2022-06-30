import PassportDocumentsOverview from '@/views/PassportDocumentsOverview.vue'
import PassportLocationsOverview from '@/views/PassportLocationsOverview.vue'
import PassportMembersOverview from '@/views/PassportMembersOverview.vue'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import BaseCategoryView from '@/views/categories/BaseCategoryView.vue'
import NonMembersOverview from '@/views/NonMembersOverview.vue'
import DocumentsOverview from '@/views/DocumentsOverview.vue'
import LocationsOverview from '@/views/LocationsOverview.vue'
import SettingsOverview from '@/views/SettingsOverview.vue'
import PassportOverview from '@/views/PassportOverview.vue'
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
      homescreen: '/kampvisum-home',
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
    path: '/kamp/:campId?/',
    name: 'Kamp',
    component: CampOverview,
    meta: {
      requiresOpenIdAuth: true,
      homescreen: '/kampvisum-home',
    },
  },
  {
    path: '/kamp/:campId?/paspoort/',
    name: 'Paspoort',
    component: PassportOverview,
    meta: {
      requiresOpenIdAuth: true,
      homescreen: '/kampvisum-home',
    },
  },
  {
    path: '/kamp/:campId?/paspoort/documenten',
    name: 'PaspoortDocumenten',
    component: PassportDocumentsOverview,
    meta: {
      requiresOpenIdAuth: true,
      homescreen: '/kampvisum-home',
    },
  },
  {
    path: '/kamp/:campId?/paspoort/locaties',
    name: 'PaspoortLocaties',
    component: PassportLocationsOverview,
    meta: {
      requiresOpenIdAuth: true,
      homescreen: '/kampvisum-home',
    },
  },
  {
    path: '/kamp/:campId?/paspoort/leden',
    name: 'PaspoortLeden',
    component: PassportMembersOverview,
    meta: {
      requiresOpenIdAuth: true,
      homescreen: '/kampvisum-home',
    },
  },
  // CATEGORY
  {
    path: '/kamp/:campId?/category/:id?',
    name: 'CATEGORY',
    component: BaseCategoryView,
    meta: {
      title: 'DYNAMIC TITLE',
      requiresOpenIdAuth: true,
      homescreen: '/kampvisum-home',
    },
  },
  // SECTIONS
  {
    path: '/kamp/:campId?/category/:id?/section/:sectionId',
    name: 'CATEGORY SECTION',
    component: BaseCategoryView,
    meta: {
      title: 'DYNAMIC TITLE',
      requiresOpenIdAuth: true,
      homescreen: '/kampvisum-home',
    },
  },
  { 
    path: "/:catchAll(.*)",
    redirect: '/kampvisum-home'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

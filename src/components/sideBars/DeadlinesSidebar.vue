<template>
  <div
    class="bg-white shadow-md ml-3 rounded-md"
    :class="{ 'md:max-w-md w-100 xs:w-full xs:fixed xs:top-0 xs:right-0 xs:h-full xs:z-50': sidebar.state === SidebarState.OPEN, 'w-8 d-flex': sidebar.state === SidebarState.CLOSED }"
  >
    <!-- WHEN CLOSED -->
    <div @click="openSideBar()" class="w-8 h-full fixed flex-column pt-3 cursor-pointer" :class="{ 'd-none': sidebar.state === SidebarState.OPEN, 'd-flex': sidebar.state === SidebarState.CLOSED }">
      <div class="flex justify-center items-center w-100 stroke-current text-red">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 xs:mr-1.5 md:mr-0" fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div class="font-bold mt-10 -mb-32" style="writing-mode: vertical-rl; text-orientation: upright">
        {{ t('sidebars.deadline-sidebar.vertical-text') }}
      </div>
      <div class="flex h-full justify-center items-center">
        <i-vertical-dots />
      </div>
    </div>

    <!-- WHEN OPEN -->
    <div class="h-full" :class="{ 'd-flex p-3 flex-column': sidebar.state === SidebarState.OPEN, 'd-none fixed': sidebar.state === SidebarState.CLOSED }">
      <!-- DEADLINE DETAIL WHEN CLICKED ON AN DEADLINE-->
      <div v-if="isDeadlineDetail" class="w-100 flex flex-col justify-between xs:mt-4 md:mt-0">
        <div class="flex justify-end mb-2">
          <i-cross class="cursor-pointer" @click="closeSideBar()" />
        </div>
        <div class="flex justify-between items-center">
          <h2>{{ t('sidebars.deadline-sidebar.title') }}</h2>
          <div class="flex gap-10 items-center">
            <div class="underline cursor-pointer" @click="goBack()">{{ t('sidebars.deadline-sidebar.return') }}</div>
          </div>
        </div>
        <!-- CARD -->
        <div class="bg-white shadow-md p-2 mt-2">
          <deadline-important-alert v-if="selectedDeadline.deadlineParent.isImportant" />

          <div class="flex flex-col px-4">
            <div class="mt-3">
              <h2>
                {{ selectedDeadline.deadlineParent.label }}
              </h2>
            </div>

            <h4 class="text-green">
              {{ t('sidebars.deadline-sidebar.deadline') }}: {{ selectedDeadline.deadlineParent.dueDate.dateDay }}/{{ selectedDeadline.deadlineParent.dueDate.dateMonth }}/{{
                selectedDeadline.deadlineParent.dueDate.dateYear
              }}
            </h4>

            <div class="my-2">
              <p>
                {{ selectedDeadline.deadlineParent.description }}
              </p>
            </div>
          </div>

          <div class="mt-3 ml-4">
            <!-- ITEMS -->
            <div class="mt-3 cursor-pointer" v-for="deadlineItem in selectedDeadline.items" :key="deadlineItem">
              <!-- CATEGORIES -->
              <div class="mt-3" v-if="deadlineItem.deadlineItemParent.deadlineItemType === 'S'">
                <div class="flex items-center gap-2">
                  <i-checked v-if="deadlineItem.linkedSubCategory.state === 'CHECKED'" />
                  <i-empty-check v-else />
                  <p>{{ deadlineItem.linkedSubCategory.category.label }}</p>
                </div>
                <span
                  v-if="deadlineItem.linkedSubCategory.state !== 'CHECKED'"
                  @click="navigateTowardsSection(deadlineItem.linkedSubCategory.category.name, visum, deadlineItem.linkedSubCategory.category.id, deadlineItem.linkedSubCategory.id, route)"
                  class="ml-4 text-green underline cursor-pointer"
                  >{{ t('sidebars.deadline-sidebar.fill-in') }}</span
                >
              </div>

              <!-- CHECKS -->
              <div
                class="mt-3"
                v-if="deadlineItem.deadlineItemParent.deadlineItemType === 'C'"
                @click="navigateTowardsSection(deadlineItem.linkedCheck.category.name, visum, deadlineItem.linkedCheck.category.id, deadlineItem.linkedCheck.id, route)"
              >
                <div class="flex gap-2">
                  <i-checked v-if="deadlineItem.linkedCheck.state === 'CHECKED'" />
                  <i-empty-check v-else />
                  <p>{{ deadlineItem.linkedCheck.category.label }}</p>
                </div>
                <span v-if="deadlineItem.linkedCheck.state !== 'CHECKED'" class="ml-4 text-green underline cursor-pointer">{{ t('sidebars.deadline-sidebar.fill-in') }}</span>
              </div>

              <!-- FLAGS -->

              <div class="mt-3" v-if="deadlineItem.deadlineItemParent.deadlineItemType === 'D'">
                <div class="flex items-center gap-2">
                  <deadline-check :flag="flag" :isUpdatingFlag="isUpdatingFlag" @toggle="toggleFlag($event)" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- LIST OF DEADLINES TO CLICK ON -->
      <div v-if="!isDeadlineDetail">
        <div class="w-100 flex items-center justify-between xs:mt-4 md:mt-0">
          <div class="flex gap-3">
            <h2>{{ t('sidebars.deadline-sidebar.title') }}</h2>
          </div>
          <i-cross class="cursor-pointer" @click="closeSideBar()" />
        </div>

        <div class="pt-3 flex flex-column gap-5">
          <deadline-info-card :text="t('sidebars.deadline-sidebar.info')" />

          <div class="text-center">
            <loader class="mt-5" color="lightGreen" size="20" :isLoading="isFetchingDeadlines" />
          </div>

          <deadline-card v-for="deadline in deadlines" :key="deadline" :deadline="deadline" :isImportant="true" @openDeadline="openDeadline($event)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import DeadlineImportantAlert from '../semantics/DeadlineImportantAlert.vue'
import DeadlineInfoCard from '@/components/cards/DeadlineInfoCard.vue'
import { DeadlineRepository } from '@/repositories/DeadlineRepository'
import RepositoryFactory from '@/repositories/repositoryFactory'
import DeadlineCard from '@/components/cards/DeadlineCard.vue'
import { Loader } from 'vue-3-component-library'
import { useNotification } from '@/composable/useNotification'
import DeadlineCheck from '../cards/checks/DeadlineCheck.vue'
import { useNavigation } from '@/composable/useNavigation'
import IVerticalDots from '../icons/IVerticalDots.vue'
import { defineComponent, PropType, ref } from 'vue'
import IEmptyCheck from '../icons/IEmptyCheck.vue'
import { Deadline } from '@/serializer/Deadline'
import IImportant from '../icons/IImportant.vue'
import IChecked from '../icons/IChecked.vue'
import { Visum } from '@/serializer/Visum'
import ICross from '../icons/ICross.vue'
import { Flag } from '@/serializer/Flag'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

export enum SidebarState {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
}

export type Sidebar = {
  state: SidebarState
}

export default defineComponent({
  name: 'DeadlinesSideBar',
  components: {
    'deadline-info-card': DeadlineInfoCard,
    'deadline-card': DeadlineCard,
    DeadlineImportantAlert,
    IVerticalDots,
    IEmptyCheck,
    IImportant,
    IChecked,
    ICross,
    Loader,
    DeadlineCheck,
  },
  props: {
    sidebar: {
      type: Object as PropType<Sidebar>,
      required: true,
    },
    visum: {
      type: Object as PropType<Visum>,
      required: true,
    },
  },
  setup(props, context) {
    const { navigateTowardsSection } = useNavigation()
    const isFetchingDeadlines = ref<boolean>(true)
    const isDeadlineDetail = ref<boolean>(false)
    const isUpdatingFlag = ref<boolean>(false)
    const selectedDeadline = ref<Deadline>()
    const deadlines = ref<any>([])
    const route = useRoute()

    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    })

    const goBack = () => {
      isDeadlineDetail.value = false
    }

    const closeSideBar = (): void => {
      context.emit('closeSidebar')
    }

    const openSideBar = (): void => {
      context.emit('openSidebar')
    }

    const openDeadline = (event: any) => {
      selectedDeadline.value = event
      isDeadlineDetail.value = true
    }

    const getDeadlines = async () => {
      await RepositoryFactory.get(DeadlineRepository)
        .getArray(props.visum.id)
        .then((d: Array<any>) => {
          deadlines.value = d
          deadlines.value.forEach((dead: Deadline) => {
            if (dead.deadlineParent && dead.deadlineParent.name === 'camp_registration') {
              openDeadline(dead)
            }
          })
          isFetchingDeadlines.value = false
        })
    }
    const { triggerNotification } = useNotification()
    const toggleFlag = async (flag: Flag) => {
      if (!isUpdatingFlag.value) {
        isUpdatingFlag.value = true
        if (flag.id) {
          await RepositoryFactory.get(DeadlineRepository)
            .updateFlag(flag.id, { flag: flag.flag })
            .then((deadline: Deadline) => {
              deadlines.value.map((dl: Deadline) => {
                if (dl.id === deadline.id) {
                  dl.state = deadline.state
                }
              })
              triggerNotification(t('sidebars.deadline-sidebar.notification-updated'))
              isUpdatingFlag.value = false
            })
        }
      }
    }

    getDeadlines()

    return {
      navigateTowardsSection,
      isFetchingDeadlines,
      isDeadlineDetail,
      selectedDeadline,
      closeSideBar,
      SidebarState,
      openDeadline,
      openSideBar,
      toggleFlag,
      deadlines,
      goBack,
      route,
      t,
    }
  },
})
</script>

<style scoped>
header {
  background: #f9f9f9 url(/bg-texture-small.jpg) no-repeat;
  background-size: cover;
  box-shadow: 0 0.125rem 0.25rem rgb(0 0 0 / 8%);
  display: block;
  position: sticky;
  top: 0;
}

.group-search__title:before {
  animation: backgroundReveal 0s 0s both;
}

.group-search__title:after {
  animation: backgroundReveal 0s 0s both;
}

.group-search__title span {
  animation: fadeIn 0s 0s both;
}

.custom-background {
  background: #f9f9f9 url(/bg-texture-small.jpg);
}
.my-background {
  background-color: red;
}
</style>

<template>
  <div class="z-50 bg-white shadow-md ml-3 rounded-md" :class="{ 'md:max-w-md w-100 xs:w-11/12 xs:fixed xs:top-0 xs:right-0 xs:h-full': sidebar.state === SidebarState.OPEN, 'w-8 d-flex': sidebar.state === SidebarState.CLOSED }">
    <!-- WHEN CLOSED -->
    <div @click="openSideBar()" class="w-8 h-screen fixed flex-column pt-3 cursor-pointer" :class="{ 'd-none': sidebar.state === SidebarState.OPEN, 'd-flex': sidebar.state === SidebarState.CLOSED }">
      <div class="flex justify-center items-center w-100 stroke-current text-red" >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 xs:mr-1.5 md:mr-0" fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>  
      </div>
      <div class="flex h-screen justify-center items-center">
        <i-vertical-dots />
      </div>
    </div>
    <div class="h-screen" :class="{ 'd-flex p-3 flex-column': sidebar.state === SidebarState.OPEN, 'd-none fixed': sidebar.state === SidebarState.CLOSED }">
      <!-- DEADLINE DETAIL WHEN CLICKED ON AN DEADLINE-->
      <div v-if="isDeadlineDetail" class="w-100 flex flex-col justify-between xs:mt-20 md:mt-0">
        <div class="flex justify-between items-center">
            <h2>
              Deadline
            </h2>
            <div class="underline cursor-pointer" @click="goBack()">
              return
            </div>
        </div>
        <!-- CARD -->
        <div class="bg-white shadow-md p-2 mt-2">
          <deadline-important-alert v-if="selectedDeadline.isImportant" />

          <div class="flex flex-col px-4">
            <div class="mt-3">
              <h2>
                {{selectedDeadline.label}}
              </h2>
            </div>

            <h4 class="text-green">Deadline: {{selectedDeadline.dueDate.dateDay}}/{{selectedDeadline.dueDate.dateMonth}}/{{selectedDeadline.dueDate.dateYear}}</h4>
          
            <div class="my-2">
              <p>
                {{selectedDeadline.description}}
              </p>
            </div>
          </div>

          <div class="mt-3">
            <!-- CHECK -->
            <div v-if="selectedDeadline.deadlineCheck">
              <div class="flex gap-2">
                <i-checked v-if="selectedDeadline.deadlineCheck.state === 'CHECKED'" />
                <i-empty-check v-else />
                <p>{{selectedDeadline.deadlineCheck.checkParent.label}}</p>
              </div>
              <span 
              v-if="selectedDeadline.deadlineCheck.state !== 'CECKED'" 
              @click="navigateTowardsSection(selectedDeadline.deadlineCheck.category.name, visum, selectedDeadline.deadlineCheck.category.id, selectedDeadline.deadlineCheck.id, route)" 
              class="ml-4 text-green underline cursor-pointer">vul aan</span>
            </div>

            <!-- CATEGORY -->
            <div v-if="selectedDeadline.deadlineSubCategory">
              <div class="flex items-center gap-2">
                <i-checked v-if="selectedDeadline.deadlineSubCategory.state === 'CHECKED'" />
                <i-empty-check v-else  />
                <p>{{selectedDeadline.deadlineSubCategory.subCategoryParent.label}}</p>
              </div>
              <span 
              v-if="selectedDeadline.deadlineSubCategory.state !== 'CECKED'" 
              @click="navigateTowardsSection(selectedDeadline.deadlineSubCategory.category.name, visum, selectedDeadline.deadlineSubCategory.category.id, selectedDeadline.deadlineSubCategory.id, route)" 
              class="ml-4 text-green underline cursor-pointer">vul aan</span>
            </div>

          </div>

        </div>
      </div>

      <!-- LIST OF DEADLINES TO CLICK ON -->
      <div v-if="!isDeadlineDetail">
          <div class="w-100 flex items-center justify-between cursor-pointer xs:mt-20 md:mt-0" @click="closeSideBar()">
            <div class="flex gap-3">
              <h2>
                Deadlines
              </h2>
            </div>
            <i-cross />
          </div>

          <div class="pt-3 flex flex-column gap-5">
            <deadline-info-card />
            <deadline-card v-for="deadline in deadlines" :key="deadline" :deadline="deadline" :isImportant="true" @openDeadline="openDeadline($event)"/>
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
import { CustomButton } from 'vue-3-component-library'
import IVerticalDots from '../icons/IVerticalDots.vue'
import { defineComponent, PropType, ref } from 'vue'
import IEmptyCheck from '../icons/IEmptyCheck.vue'
import { Deadline } from '@/serializer/Deadline'
import IImportant from '../icons/IImportant.vue'
import { Visum } from '@/serializer/Visum'
import ICross from '../icons/ICross.vue'
import IChecked from '../icons/IChecked.vue'
import { useNavigation } from '@/router/navigation'
import { useRoute } from 'vue-router'

export enum SidebarState {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED'
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
    CustomButton,
    IEmptyCheck,
    IImportant,
    ICross,
    IChecked
  },
  props: {
    sidebar: {
      type: Object as PropType<Sidebar>,
      required: true,
    },
    visum: {
      type: Object as PropType<Visum>,
      required: true,
    }
  },
  setup(props, context) {
    const { navigateTowardsSection } = useNavigation()
    const deadlines = ref<any>([])
    const isDeadlineDetail = ref<boolean>(false)
    const selectedDeadline = ref<Deadline>()
    const route = useRoute()

    const goBack = () => {
      isDeadlineDetail.value = false
    }

    const closeSideBar= (): void => {
      context.emit('closeSidebar')
    }

    const openSideBar= (): void => {
      context.emit('openSidebar')
    }

    const openDeadline = (event: any) => {
      console.log('EVENT: ', event)
      selectedDeadline.value = event
      isDeadlineDetail.value = true
    }

    const getDeadlines = async () => {
      await RepositoryFactory.get(DeadlineRepository)
        .getArray(props.visum.id)
        .then((d: Array<any>) => {
          deadlines.value = d
        })
    }

    getDeadlines()

    return {
      closeSideBar,
      SidebarState,
      openSideBar,
      deadlines,
      openDeadline,
      isDeadlineDetail,
      selectedDeadline,
      goBack,
      route,
      navigateTowardsSection
    }
  }
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

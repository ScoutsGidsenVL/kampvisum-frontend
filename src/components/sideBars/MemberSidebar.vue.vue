<template>
  <div class="h-full">
    <base-side-bar
      :is-display="sideBarState.state !== 'hide'"
      :is-edit="sideBarState.state === 'edit'"
      :isOverflowHidden="isOverflowHidden"
      @hideSidebar="closeSideBar"
      :selection="selected"
      maxWidth="max-w-2xl"
      name="MemberSidebar"
      :title="title"
    >
      <div class="p-4 mx-1">
        <search-input v-model:loading="loading" name="search" placeholder="Zoek op naam" :repository="MemberRepository" @fetchedOptions="fetchedSearchResults($event)" />
      </div>

      <div class="mx-1 overflow-y-auto">
        <div class="mx-4">
          <div
            v-for="(member, index) in fetchedMembers"
            :key="member"
            :class="{ 'border-t-2 border-black': index === 0 }"
            class="py-2 w-full shadow-md border-b-2 border-black bg-white p-2 inline-block text-left d-flex flex-col justify-content-between"
          >
            <member-sidebar-item :member="member">
              <div class="flex justify-end">
                <!-- <custom-button
                  type="button"
                  :text="existingList.some((m) => m.id === member.id || m.groupAdminId === member.groupAdminId) ? 'Toegevoegd' : 'Voeg toe'"
                  :disabled="
                    existingList && existingList.some((m) => m.id === member.id || m.groupAdminId === member.groupAdminId)
                    ? true
                    : false
                  "
                  @click="addMember(member)"
                /> -->
              </div>
            </member-sidebar-item>
          </div>
        </div>
      </div>

      <div class="mt-5 py-4 sticky bottom-0 bg-white pl-3">
        <custom-button :isSubmitting="isSubmitting" text="VOEG TOE" />
      </div>
    </base-side-bar>
  </div>
</template>

<script lang="ts">
import { BaseSideBar, sideBarState, InputTypes } from 'vue-3-component-library'
import { MemberRepository } from '../../repositories/MemberRepository'
import { computed, defineComponent, PropType, ref, toRefs } from 'vue'
import MemberSidebarItem from '../semantics/MemberSidebarItem.vue'
import { PostLocation } from '../../serializer/PostLocation'
import { CustomButton } from 'vue-3-component-library'
import SearchInput from '../inputs/SearchInput.vue'
import { Member } from '@/serializer/Member'
import { Check } from '@/serializer/Check'
import { useForm } from 'vee-validate'
import { useI18n } from 'vue-i18n'
import RepositoryFactory from '@/repositories/repositoryFactory'
import { MemberCheckRepository } from '@/repositories/MemberCheckRepository'
import { Visum } from '@/serializer/Visum'

export default defineComponent({
  name: 'LocationCreateSideBar',
  components: {
    'base-side-bar': BaseSideBar,
    SearchInput,
    MemberSidebarItem,
    CustomButton
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    existingList: {
      type: Array,
      default: () => {
        return []
      },
    },
    closeOnAdd: {
      type: Boolean,
      default: false,
      required: false,
    },
    sideBarState: {
      type: Object as PropType<sideBarState<Location>>,
      required: true,
      default: () => {
        'hide'
      },
    },
    isOverflowHidden: {
      type: Boolean,
      required: false,
      default: true,
    },
    check: {
      type: Object as PropType<Check>,
      required: true
    },
    visum: {
      type: Object as PropType<Visum>,
      required: true,
    },
  },
  emits: ['update:sideBarState', 'actionSuccess'],
  setup(props, context) {
    const selected = computed(() => (props.sideBarState.state === 'list' ? 'BestaandCamp' : 'NieuwCamp'))
    const { resetForm, handleSubmit, values, isSubmitting } = useForm<PostLocation>()
    const { sideBarState } = toRefs(props)
    const loading = ref<boolean>(false)
    const fetchedMembers = ref<Member[]>([])

    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    })

    const closeSideBar = () => {
      context.emit('update:sideBarState', { state: 'hide' })
      resetForm()
    }

    const onSubmit = async () => {
      handleSubmit(async () => {
        if (props.sideBarState.state === 'edit') {
          // await updateCamp(values)
        } else {
          // await postLocation(values)
        }
        closeSideBar()
      })()
    }

    const postMemberToList = async (data: Member) => {
      await RepositoryFactory.get(MemberCheckRepository)
        .update(props.check.endpoint, data)
        .then(() => {
          context.emit('actionSuccess', 'POST')
        })
    }

    const fetchedSearchResults = (results: any) => {
      loading.value = false
      fetchedMembers.value = results
    }

    const addMember = async (member: Member) => {
      await postMemberToList(member)
      context.emit('update:sideBarState', { state: 'hide' })
    }

    return {
      fetchedSearchResults,
      MemberRepository,
      isSubmitting,
      sideBarState,
      closeSideBar,
      InputTypes,
      selected,
      onSubmit,
      loading,
      values,
      t,
      fetchedMembers,
      addMember
    }
  },
})
</script>

<style lang="scss" scoped>
/* width */
::-webkit-scrollbar {
  width: 5px;
  margin-left: 20x;
  padding-left: 20px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px #ececec;
  border-radius: 10px;
  margin-left: 20x;
  padding-left: 20px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #212529;
  border-radius: 10px;
  margin-left: 20x;
  padding-left: 20px;
}
</style>

<template>
  <div>
    <base-side-bar
      maxWidth="max-w-2xl"
      :isOverflowHidden="isOverflowHidden"
      :selection="selected"
      :is-display="sideBarState.state !== 'hide'"
      :is-edit="sideBarState.state === 'edit'"
      name="ParticipantSidebar"
      :title="title"
      :options="options"
      @options="changeSideBar"
      @hideSidebar="closeSideBar"
    >
      <!-- CREATE -->
      <form
        id="ParticipantForm"
        ref="formDiv"
        :class="{ 'd-flex': sideBarState.state === 'new' || sideBarState.state === 'edit', 'd-none': sideBarState.state === 'search' }"
        class="flex-col relative overflow-y-scroll h-full px-4 pt-3"
        @submit.prevent="onSubmit"
      >
        <div class="mt-4">
          <div class="w-100">
            <custom-input :loading-submit="isSubmitting" :type="InputTypes.TEXT" rules="required" name="firstName" label="Voornaam" />
          </div>

          <div class="w-100 mt-4">
            <custom-input :loading-submit="isSubmitting" :type="InputTypes.TEXT" rules="required" name="lastName" label="Achternaam" />
          </div>

          <div class="w-100 mt-4">
            <custom-input :loading-submit="isSubmitting" :type="InputTypes.TEXT" rules="required" name="email" label="Email" />
          </div>

          <div class="w-100 mt-4">
            <custom-input :loading-submit="isSubmitting" :type="InputTypes.TEXT" rules="required" name="phoneNumber" label="Gsm" />
          </div>

          <div class="w-100 mt-4">
            <custom-input :loading-submit="isSubmitting" :type="InputTypes.TEXT" rules="required" name="city" label="Stad" />
          </div>

          <div class="w-100 mt-4">
            <custom-input :loading-submit="isSubmitting" :type="InputTypes.TEXT" rules="required" name="postalCode" label="Postcode" />
          </div>

          <div class="w-100 mt-4">
            <custom-input :loading-submit="isSubmitting" :type="InputTypes.TEXT" rules="required" name="street" label="Straat" />
          </div>

          <div class="w-100 mt-4">
            <custom-input :loading-submit="isSubmitting" :type="InputTypes.TEXT" maxlength="5" rules="required" name="number" label="Nr" />
          </div>

          <div class="w-100 mt-4">
            <custom-input :loading-submit="isSubmitting" :type="InputTypes.TEXT" maxlength="5" name="letterBox" label="Bus" />
          </div>

          <div class="w-100 mt-4">
            <custom-input :loading-submit="isSubmitting" :type="InputTypes.DATE" rules="required" name="birthDate" label="Geboortedatum" />
          </div>

          <div class="w-100 mt-4">
            <custom-input :loading-submit="isSubmitting" :type="InputTypes.TEXT_AREA" name="comment" label="Opmerking" />
          </div>
        </div>

        <div class="mt-5 py-4 sticky bottom-0 bg-white pl-3" style="margin-left: -20px; margin-right: -20px">
          <custom-button :loading-submit="isSubmitting" :text="sideBarState.state === 'edit' ? 'Bewerk' : 'Voeg toe'" />
        </div>
      </form>
      <!-- SEARCH -->
      <form
        id="SearchForm"
        ref="searchFormDiv"
        :class="{ 'd-none': sideBarState.state === 'new' || sideBarState.state === 'edit', 'd-flex': sideBarState.state === 'search' }"
        class="flex-col h-full"
        @submit.prevent="onSubmit"
      >
        <div class="p-4 mx-1">
          <search-input v-model:loading="loading" name="search" placeholder="Zoek op naam" :repository="ParticipantRepository" @fetchedOptions="fetchedSearchResults($event)" />
        </div>
        <div class="mx-1 mb-72 overflow-y-auto">
          <div class="mx-4">
            <div
              v-for="(member, index) in fetchedMembers"
              :key="member"
              :class="{ 'border-t-2 border-black': index === 0 }"
              class="py-4 w-full shadow-md border-b-2 border-black bg-white p-2 inline-block text-left d-flex flex-col justify-content-between"
            >
              <member-sidebar-item :displayCheck="displayCheck(check.checkParent.isMultiple, member, fetchedMembers)" :member="member" />
            </div>
          </div>
        </div>
        <div class="mt-5 py-4 px-4 absolute bottom-0 bg-white w-full">
          <custom-button :isSubmitting="isPatching" text="VOEG TOE" />
        </div>
      </form>
    </base-side-bar>
  </div>
</template>

<script lang="ts">
import { BaseSideBar, sideBarState, InputTypes, CustomInput, CustomButton, option } from 'vue-3-component-library'
import { ParticipantCheckRepository } from '@/repositories/ParticipantCheckRepository'
import { ParticipantRepository } from '@/repositories/ParticipantRepository'
import { computed, defineComponent, PropType, ref, toRefs } from 'vue'
import { MemberRepository } from '../../repositories/MemberRepository'
import MemberSidebarItem from '../semantics/MemberSidebarItem.vue'
import { useSelectionHelper } from '../../helpers/selectionHelper'
import RepositoryFactory from '@/repositories/repositoryFactory'
import SearchInput from '../inputs/SearchInput.vue'
import { Member } from '@/serializer/Member'
import { Check } from '@/serializer/Check'
import { Visum } from '@/serializer/Visum'
import { useForm } from 'vee-validate'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'ParticipantSideBar',
  components: {
    'base-side-bar': BaseSideBar,
    SearchInput,
    CustomInput,
    CustomButton,
    MemberSidebarItem,
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
      type: Object as PropType<sideBarState<any>>,
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
    const selected = computed(() => (props.sideBarState.state === 'new' ? 'newParticipantSidebar' : 'searchParticipantSidebar'))
    const { resetForm, values, isSubmitting, handleSubmit } = useForm<Member>()
    const { displayCheck, checkForIdMatch } = useSelectionHelper()
    const fetchedMembers = ref<Member[]>([])
    const { sideBarState } = toRefs(props)
    const isPatching = ref<boolean>(false)
    const loading = ref<boolean>(false)

    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    })

    const options = ref<option[]>([
      { text: 'Nieuw', value: 'new' },
      { text: 'Zoek', value: 'search' },
    ])

    const closeSideBar = () => {
      context.emit('update:sideBarState', { state: 'hide' })
      resetForm()
    }

    const onSubmit = async () => {
      // await validate().then((validation: any) => scrollToFirstError(validation, 'addNewCamp'))
      if (props.sideBarState.state === 'search') {
        console.log('fetchedMembers', fetchedMembers.value)
        addMembers(fetchedMembers.value)
      }

      handleSubmit(async (values: Member) => {
        if (props.sideBarState.state === 'edit') {
          // await updateCamp(values)
        } else if (props.sideBarState.state === 'new') {
          await postParticipant(values)
        }
        closeSideBar()
      })()
    }

    const postMembers = async (data: Member[]) => {
      await RepositoryFactory.get(ParticipantCheckRepository)
        .update(props.check.endpoint, data)
        .then(() => {
          context.emit('actionSuccess', 'PATCH')
        })
    }

    const addMembers = async (members: Member[]) => {
      isPatching.value = true
      await postMembers(members)
      isPatching.value = false
      closeSideBar()
    }

    const postParticipant = async (participant: Member) => {
      await RepositoryFactory.get(ParticipantRepository)
        .create(participant)
        .then(() => {
          context.emit('actionSuccess', 'POST')
        })
    }

    const fetchedSearchResults = (results: Member[]) => {
      loading.value = false
      //KEEP THE CHECKED MEMBERS
      let checkedMembers: Member[] = []

      fetchedMembers.value.forEach((fetchedMember: Member) => {
        if (fetchedMember.isChecked) {
          checkedMembers.push(fetchedMember)
        }
      })

      //SET CHECKED MEMBERS
      fetchedMembers.value = checkedMembers

      //ADD FETCHED RESULTS ONLY IF IT'S NOT ALREADY CHECKED
      results.forEach((r: Member) => {
        if (!(fetchedMembers.value.some((f: Member) => checkForIdMatch(f,r)))) {
          fetchedMembers.value.push(r)
        }
      })
    }

    const changeSideBar = (options: 'newParticipantSidebar' | 'searchParticipantSidebar') => {
      if (options === 'newParticipantSidebar') {
        context.emit('update:sideBarState', { state: 'new' })
      }

      if (options === 'searchParticipantSidebar') {
        context.emit('update:sideBarState', { state: 'search' })
      }
    }

    return {
      ParticipantRepository,
      fetchedSearchResults,
      MemberRepository,
      fetchedMembers,
      changeSideBar,
      isSubmitting,
      sideBarState,
      closeSideBar,
      displayCheck,
      InputTypes,
      isPatching,
      selected,
      onSubmit,
      loading,
      options,
      values,
      t,
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

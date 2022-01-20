<template>
  <div>
    <base-side-bar
      maxWidth="max-w-2xl"
      :isOverflowHidden="isOverflowHidden"
      :selection="selected"
      :is-display="sideBarState.state !== 'hide'"
      :is-edit="sideBarState.state === 'edit'"
      name="FourageSidebar"
      :title="title"
      :options="options"
      @options="changeSideBar"
      @hideSidebar="closeSideBar"
    >
      <form
        id="FourageForm"
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
            <custom-input :loading-submit="isSubmitting" :type="InputTypes.TEXT" rules="required" name="street" label="Straat" />
          </div>

          <div class="w-100 mt-4">
            <custom-input :loading-submit="isSubmitting" :type="InputTypes.TEXT" maxlength="5" rules="required" name="number" label="Nr" />
          </div>

          <div class="w-100 mt-4">
            <custom-input :loading-submit="isSubmitting" :type="InputTypes.TEXT" maxlength="5" name="letterBox" label="Bus" />
          </div>

          <div class="w-100 mt-4">
            <custom-input :loading-submit="isSubmitting" :type="InputTypes.DATE" name="birthDate" label="Geboortedatum" />
          </div>

          <div class="w-100 mt-4">
            <custom-input :loading-submit="isSubmitting" :type="InputTypes.TEXT_AREA" name="comment" label="Opmerking" />
          </div>
        </div>

        <div class="mt-5 py-4 sticky bottom-0 bg-white pl-3" style="margin-left: -20px; margin-right: -20px">
          <custom-button :loading-submit="isSubmitting" :text="sideBarState.state === 'edit' ? 'Bewerk' : 'Voeg toe'" />
        </div>
      </form>

      <form :class="{ 'd-flex': sideBarState.state === 'search', 'd-none': sideBarState.state === 'new' || sideBarState.state === 'edit' }" class="flex-col h-full px-4 pt-3" @submit.prevent="onSubmit">
        <div>
          <search-input v-model:loading="loading" name="FourageMemberSearch" placeholder="Zoek op naam" :repository="NonMemberRepository" @fetchedOptions="fetchedOptions($event)" />
        </div>

        <div class="h-full overflow-y-scroll mt-4 pb-36">
          <!-- <hr v-if="selectedNonMembers.length > 0" class="mt-4 border-t-2 w-100 border-black" /> -->
          <!-- <div v-for="nonMember in selectedNonMembers" :key="nonMember.id" class="w-100">
            <non-member-item :non-member="nonMember">
              <div>
                <div class="pt-3 pb-4 text-right"><custom-button type="button" :text="existingList.includes(nonMember) ? 'Toegevoegd' : 'Voeg toe'" @click="addNonMember(nonMember)" /></div>
              </div>
            </non-member-item>
          </div> -->
        </div>
      </form>
    </base-side-bar>
  </div>
</template>

<script lang="ts">
import { BaseSideBar, sideBarState, InputTypes, CustomInput, CustomButton, option } from 'vue-3-component-library'
import { computed, defineComponent, PropType, ref, toRefs } from 'vue'
import { FourageMember } from '../../serializer/FourageMember'
import SearchInput from '../inputs/SearchInput.vue'
import { useForm } from 'vee-validate'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'FourageSideBar',
  components: {
    'base-side-bar': BaseSideBar,
    SearchInput,
    CustomInput,
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
    }
  },
  emits: ['update:sideBarState', 'actionSuccess'],
  setup(props, context) {
    const selected = computed(() => (props.sideBarState.state === 'new' ? 'newFourageSidebar' : 'searchFourageSidebar'))
    const { resetForm, handleSubmit, validate, values, isSubmitting } = useForm<FourageMember>()
    const { sideBarState } = toRefs(props)

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
      // await validate().then((validation: any) => scrollToFirstError(validation, 'addNewLocation'))
      handleSubmit(async (values: FourageMember) => {
        if (props.sideBarState.state === 'edit') {
          // await updateCamp(values)
        } else {
          // await postLocation(values)
          console.log('POSTING FOURAGE: ', values)
        }
        closeSideBar()
      })()
    }
    
    const fetchedSearchResults = (result: any ) => {
      loading.value = false
    }

    const changeSideBar = (options: 'newFourageSidebar' | 'searchFourageSidebar') => {
      if (options === 'newFourageSidebar') {
        context.emit('update:sideBarState', { state: 'new' })
      }

      if (options === 'searchFourageSidebar') {
        context.emit('update:sideBarState', { state: 'search' })
      }
    }

    const loading = ref<boolean>(false)

    return {
      fetchedSearchResults,
      isSubmitting,
      sideBarState,
      changeSideBar,
      closeSideBar,
      InputTypes,
      selected,
      onSubmit,
      loading,
      values,
      t,
      options
    }
  },
})
</script>

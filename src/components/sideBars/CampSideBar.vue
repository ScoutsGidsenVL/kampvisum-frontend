<template>
  <div>
    <base-side-bar
      :isOverflowHidden="isOverflowHidden"
      :selection="selected"
      :is-display="sideBarState.state !== 'hide'"
      :is-edit="sideBarState.state === 'edit'"
      name="Camp"
      :title="title"
      :options="options"
      @options="changeSideBar"
      @hideSidebar="closeSideBar"
    >
    </base-side-bar>
  </div>
</template>

<script lang="ts">
import { BaseSideBar, sideBarState, option } from 'vue-3-component-library'
import { defineComponent, PropType, ref, toRefs, watch } from 'vue'

export default defineComponent({
  name: 'NonMemberSideBar',
  components: {
    'base-side-bar': BaseSideBar,
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
    isExtraInformationComment: {
      type: Boolean,
      required: false,
      default: false,
    },
    isOverflowHidden: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  emits: ['update:sideBarState', 'addCreatedNonMemberToList', 'updateMemberInList'],
  setup(props, context) {

    const { sideBarState } = toRefs(props)

    const options = ref<option[]>([
      { text: 'Nieuw', value: 'Nieuw' },
      { text: 'Uit eerdere aanvragen', value: 'Bestaand' },
    ])    

    const closeSideBar = () => {
      context.emit('update:sideBarState', { state: 'hide' })
      console.log('CLOSE SIDE BAR')
    }

    const changeSideBar = (options: 'NieuwNonMember' | 'BestaandNonMember') => {
      if (options === 'NieuwNonMember') {
        context.emit('update:sideBarState', { state: 'new' })
      }

      if (options === 'BestaandNonMember') {
        context.emit('update:sideBarState', { state: 'list' })
      }
    }

    watch(sideBarState, (value: sideBarState<any>) => {
      if (value.state === 'edit') {
        console.log('CAMP SIDE BAR EDIT')
      }
    })

    return {
      sideBarState,
      closeSideBar,
      changeSideBar,
      options
    }
  },
})
</script>


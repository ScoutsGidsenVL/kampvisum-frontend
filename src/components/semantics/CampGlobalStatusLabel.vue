<template>
   <message
        class="my-3" 
        :title="t(`global-camp-state.title-${state}`)"
        :text="showTextLabel(state)"
        :color="{state: colorMap[state]}"
        :hasCheck="false"
        />
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Visum } from '@/serializer/Visum'
import { ColorState } from './message.vue'
import Message from '@/components/semantics/message.vue'
import useVisum, { GlobalVisumState } from '@/composable/useVisum'


export default defineComponent({
  components: { Message },
  name: 'CampGlobalStatusLabel',
  props: {
    visum: {
      type: Object as PropType<Visum>,
      required: true,
    },
    showText: {
        type: Boolean,
        required: false, 
        default: false
    }
  },
  setup(props){
    const {  getGlobalVisumState } = useVisum()

    const state = getGlobalVisumState(props.visum)

    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    })

    const colorMap : Record<GlobalVisumState, ColorState> = {
        'ACCEPTED': ColorState.SUCCES,
        'FEEDBACK':ColorState.WARNING,
        'DISAPPROVED':ColorState.DANGER,
        'INPROGRESS':ColorState.GRAY,
        'READYFORDC': ColorState.GRAY
    }

    const showTextLabel = (state: GlobalVisumState) => {
        //If prop is not true, never show text
        if(!props.showText){
            return undefined
        }

        //If translation is available or not empty show text 
        if(t(`global-camp-state.msg-${state}`) &&  t(`global-camp-state.msg-${state}`) !== ''){
            const test : string =  t(`global-camp-state.msg-${state}`)
            return test
        }

        return undefined
    }
 
    return {
        showTextLabel,
      colorMap,
      state,
      t
    }
  },
})
</script>

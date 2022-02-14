<template>
  <div>
    <label class="font-bold" for="">{{check.checkParent.label}}</label>
    <custom-input class="w-52" :type="InputTypes.TEXT" :name="'number'" />
  </div>
</template>

<script lang="ts">
import { useNotification } from '../../composable/useNotification'
import { InputTypes, CustomInput } from 'vue-3-component-library'
import { defineComponent, PropType, watch } from 'vue'
import { Check } from '@/serializer/Check'
import { useForm } from 'vee-validate'
import RepositoryFactory from '@/repositories/repositoryFactory'
import { NumberCheckRepository } from '@/repositories/NumberCheckRepository'

export default defineComponent({
  name: 'NumberCheck',
  components: {
    CustomInput
  },
  props: {
    check: {
      type: Object as PropType<Check>,
      required: true
    },
  },
  setup (props) {

    const { triggerNotification } = useNotification()


    const { values } = useForm({
      initialValues: { number: props.check.value ? props.check.value : '' },
    })

    const patchNumberCheck = async (comment: string) => {
      await RepositoryFactory.get(NumberCheckRepository)
        .update(props.check.endpoint, comment)
        .then((p: any) => {
          triggerNotification('Aanpassingen aan het kamp zijn succesvol opgeslagen!')
        })
    }

    watch(
      () => values.number,
      () => {
        patchNumberCheck(values.number)
      }
    )

    return {
      InputTypes,
      values,
    }
  }
})
</script>

<template>
  <div>
    <label class="font-bold" for="">{{check.checkParent.label}}</label>
    <custom-input class="w-52" :type="InputTypes.TEXT" :name="'number'" />
  </div>
</template>

<script lang="ts">
import { NumberCheckRepository } from '@/repositories/NumberCheckRepository'
import { useNotification } from '../../composable/useNotification'
import { InputTypes, CustomInput } from 'vue-3-component-library'
import RepositoryFactory from '@/repositories/repositoryFactory'
import { defineComponent, PropType, watch } from 'vue'
import { Check } from '@/serializer/Check'
import { useForm } from 'vee-validate'
import { useI18n } from 'vue-i18n'
import useGroupAndYears from '@/composable/useGroupAndYears'

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
    const { selectedGroup } = useGroupAndYears()
    const { triggerNotification } = useNotification()

    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    })

    const { values } = useForm({
      initialValues: { number: props.check.value ? props.check.value : '' },
    })

    const patchNumberCheck = async (comment: string) => {
      await RepositoryFactory.get(NumberCheckRepository)
        .update(selectedGroup.value.groupAdminId, props.check.endpoint, comment)
        .then((p: any) => {
          triggerNotification(t('checks.number-check.notification-patched'))
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
      t
    }
  }
})
</script>

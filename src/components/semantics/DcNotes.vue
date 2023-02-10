<template>
  <div>
      <strong>{{t('engagement.internal')}}</strong>
      <custom-input @changedTextArea="changedTextArea($event)" textAreaWidth="w-100 w-100" :type="InputTypes.TEXT_AREA" :name="'notes'" />
  </div>
</template>

<script lang="ts">
import { InputTypes, CustomInput } from 'vue-3-component-library'
import { useNotification } from '@/composable/useNotification'
import { defineComponent, PropType, watch } from 'vue'
import IEmptyCheck from '../icons/IEmptyCheck.vue'
import IChecked from '../icons/IChecked.vue'
import { Visum } from '@/serializer/Visum'
import { useForm } from 'vee-validate'
import { useI18n } from 'vue-i18n'
import RepositoryFactory from '@/repositories/repositoryFactory'
import { CampVisumRepository } from '@/repositories/CampVisumRepository'
import useGroupAndYears from '@/composable/useGroupAndYears'

export default defineComponent({
  name: 'DcNotes',
  components: {
    CustomInput,
    IEmptyCheck,
    IChecked
  },
  props: {
    visum: {
      type: Object as PropType<Visum>,
      required: true,
    },
  },
  setup (props) {
    const { selectedGroup } = useGroupAndYears()
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    })

    const { triggerNotification } = useNotification()
    let debounce: any

    const { values } = useForm({
      initialValues: { notes: props.visum.notes ? props.visum.notes : '' },
    })

    watch(
      () => values.notes,
      () => {
        clearTimeout(debounce)
        debounce = setTimeout(() => {
          if (true) {
          RepositoryFactory.get(CampVisumRepository)
          .patchVisumNotes(selectedGroup.value.groupAdminId, props.visum.id, values.notes)
          .then(() => {
            triggerNotification(t('engagement.notes-notification'))
          })
          }
        }, 1000)
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
<template>
  <div>
    <custom-input @changedTextArea="changedTextArea($event)" textAreaWidth="w-100 w-100" :type="InputTypes.TEXT_AREA" :name="'comment'" :label="check.checkParent.label" />
  </div>
</template>

<script lang="ts">
import { CommentCheckRepository } from '@/repositories/CommentCheckRepository'
import { useNotification } from '../../composable/useNotification'
import { InputTypes, CustomInput } from 'vue-3-component-library'
import RepositoryFactory from '@/repositories/repositoryFactory'
import { defineComponent, PropType, watch } from 'vue'
import { Check } from '@/serializer/Check'
import { useForm } from 'vee-validate'
import { useI18n } from 'vue-i18n'
import useGroupAndYears from '@/composable/useGroupAndYears'

export default defineComponent({
  name: 'CommentCheck',
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
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    })
    const { triggerNotification } = useNotification()
    let debounce: any

    const { values } = useForm({
      initialValues: { comment: props.check.value.value },
    })

    const patchCommentCheck = async (comment: string) => {
      await RepositoryFactory.get(CommentCheckRepository)
        .update(selectedGroup.value.groupAdminId, props.check.endpoint, comment)
        .then((p: any) => {
          triggerNotification(t('checks.notification-updated'))
        })
    }

    watch(
      () => values.comment,
      () => {
        clearTimeout(debounce)
        debounce = setTimeout(() => {
          patchCommentCheck(values.comment)
        }, 1000)
      }
    )

    return {
      InputTypes,
      values,
    }
  }
})
</script>

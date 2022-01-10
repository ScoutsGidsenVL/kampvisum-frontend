<template>
  <div>
    <custom-input @changedTextArea="changedTextArea($event)" textAreaWidth="w-100 w-100" :type="InputTypes.TEXT_AREA" :name="'comment'" :label="check.checkParent.label" />
  </div>
</template>

<script lang="ts">
import { InputTypes, CustomInput } from 'vue-3-component-library'
import { defineComponent, PropType, watch } from 'vue'
import { Check } from '@/serializer/Check'
import { useForm } from 'vee-validate'
import RepositoryFactory from '@/repositories/repositoryFactory'
import { CommentCheckRepository } from '@/repositories/CommentCheckRepository'

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
    let debounce: any

    const { values } = useForm({
      initialValues: { comment: '' },
    })

    const patchCommentCheck = async (comment: string) => {
      await RepositoryFactory.get(CommentCheckRepository)
        .update(props.check.endpoint, comment)
        .then((p: any) => {
          console.log('PATCH RESPONSE: ', p)
        })
    }

    watch(
      () => values.comment,
      () => {
        clearTimeout(debounce)
        debounce = setTimeout(() => {
          patchCommentCheck(values.comment)
        }, 1500)
      }
    )

    return {
      InputTypes,
      values,
    }
  }
})
</script>

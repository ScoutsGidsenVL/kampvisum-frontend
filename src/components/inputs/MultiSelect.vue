<template>
  <div v-if="options">
    <div>
      <strong v-show="label">
        {{ label }}
      </strong>
      <strong><required class="inline" v-if="label" :rules="rules" /></strong>
    </div>
    <div
      class="min-w-0"
      :class="{
        'text-lightGray animate-pulse2 bg-lightGray': isLoading,
      }"
    >
      <multi-select
        :preserveSearch="false"
        :id="id"
        ref="multiselect"
        v-model="inputValue"
        :name="id"
        :value-prop="valueProp"
        :disabled="disabled || isLoading"
        :filter-results="true"
        :min-chars="1"
        :resolve-on-load="true"
        :delay="500"
        :placeholder="placeholder"
        :track-by="trackBy"
        :label="trackBy"
        :searchable="searchable"
        :search="true"
        :object="object"
        :allow-empty="false"
        :multiple="false"
        :canClear="canClear"
        :canDeselect="canDeselect"
        :options="
          searchableByApi
            ? async function (query) {
                return fetchSearchData(query)
              }
            : options
        "
        no-options-text="-geen resultaten-"
      />
      <error-message class="text-red font-light ml-1 mt-1 text-sm inline-block" :name="id" />
    </div>
  </div>
</template>

<script lang="ts">
import RepositoryFactory from '@/repositories/repositoryFactory'
import { BaseRepository } from '@/repositories/baseRepository'
import { ErrorMessage, useField } from 'vee-validate'
import { defineComponent } from '@vue/runtime-core'
import {Required} from 'vue-3-component-library'
import Multiselect from '@vueform/multiselect'
import { PropType, ref, watch } from 'vue'

export default defineComponent({
  name: 'AppMultiSelect',
  components: {
    'error-message': ErrorMessage,
    'multi-select': Multiselect,
    Required,
  },
  emits: ['fetchedOptions', 'addSelection'],
  props: {
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: false,
    },
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
    options: {
      type: Array as PropType<Array<any>>,
      required: true,
    },
    rules: {
      type: [Object, String, Function],
      default: '',
      required: false,
    },
    trackBy: {
      type: String,
      required: false,
    },
    placeholder: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      default: '',
    },
    searchable: {
      type: Boolean,
      default: false,
    },
    searchableByApi: {
      type: Boolean,
      default: false,
    },
    repository: {
      type: Function as unknown as PropType<new () => BaseRepository>,
      required: false,
      default: Function as unknown as PropType<new () => BaseRepository>,
    },
    valueProp: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    resolveOnLoad: {
      type: Boolean,
      default: false,
      required: false,
    },
    object: {
      type: Boolean,
      default: false,
      required: false,
    },
    extraOption: {
      type: Object as PropType<any>,
      required: false,
    },
    isLoading: {
      type: Boolean,
      default: false,
      required: false,
    },
    canClear: {
      type: Boolean,
      default: true,
      required: false,
    },
    canDeselect: {
      type: Boolean,
      default: true,
      required: false,
    }
  },
  setup(props, context) {
    const multiselect = ref()
    const { value: inputValue } = useField(props.id, props.rules, {
      initialValue: props.value,
    })

    const fetchSearchData = async (query: string) => {
      let data: any = []

      if (query) {
        await RepositoryFactory.get(props.repository)
          .search(query)
          .then((res: any) => {
            data = props.extraOption ? [...[props.extraOption], ...res] : res
            context.emit('fetchedOptions', data)
          })
      } else {
        if (props.resolveOnLoad) {
          data = props.options
        }
      }
      return data
    }

    watch(
      () => inputValue.value,
      () => {
        context.emit('addSelection', inputValue.value)
      }
    )

    return {
      fetchSearchData,
      multiselect,
      inputValue,
    }
  },
})
</script>

<style src="@vueform/multiselect/themes/default.css"></style>

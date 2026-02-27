<template>
  <div>
    <label class="block text-sm font-medium mb-1">{{ check.checkParent.label }}</label>
    <select class="w-full border rounded p-2" :value="check.value?.value || ''" @change="onChange($event)">
      <option value="">-- Kies --</option>
      <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
    </select>
  </div>
</template>

<script lang="ts">
import { SelectCheckRepository } from '@/repositories/SelectCheckRepository'
import { useNotification } from '../../composable/useNotification'
import RepositoryFactory from '@/repositories/repositoryFactory'
import { defineComponent, PropType, ref } from 'vue'
import { Check } from '@/serializer/Check'
import { useI18n } from 'vue-i18n'
import useGroupAndYears from '@/composable/useGroupAndYears'

export default defineComponent({
  name: 'SelectCheck',
  props: {
    check: {
      type: Object as PropType<Check>,
      required: true,
    },
  },
  setup(props) {
    const { selectedGroup } = useGroupAndYears()
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    })
    const { triggerNotification } = useNotification()

    const options = ref([
      'Te voet',
      'Openbaar vervoer',
      'Autocar',
      'Fiets',
      'Auto',
      'Carpool',
      'Vliegtuig',
      'Boot',
      'Andere',
    ])

    const onChange = async (event: Event) => {
      const value = (event.target as HTMLSelectElement).value
      await RepositoryFactory.get(SelectCheckRepository)
        .update(selectedGroup.value.groupAdminId, props.check.endpoint, value)
        .then(() => {
          triggerNotification(t('checks.notification-updated'))
        })
    }

    return {
      options,
      onChange,
    }
  },
})
</script>

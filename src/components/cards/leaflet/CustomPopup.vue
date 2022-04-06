<template>
  <div>
    <h1 class="text-xl underline pb-3">{{ parentLocation.name }}</h1>
    <div class="flex gap-2 items-center">
      <h1 v-if="location.name" class="text-lg mt-1">{{ location.name }}</h1>
      <!-- <div v-if="location.isMainLocation" class="font-bold text-sm text-white bg-lightGreen m-0 rounded-full px-2 h-5">{{t('checks.location-check.main-location')}}</div> -->
    </div>
    <div class="pb-3">
      <a class="text-sm" target="_blank" :href="'https://www.google.com/maps?q=' + location.address">{{ location.address }}</a>  
    </div>    
    <div v-if="parentLocation.contactName || parentLocation.contactPhone || parentLocation.contactEmail" class="bg-lighterGreen py-2 px-1 border-l-2 border-green flex flex-col gap-2">
      <div v-if="parentLocation.contactName" class="flex gap-3 items-center">
        <i-person-green />
        <span>{{ parentLocation.contactName }}</span>
      </div>

      <div v-if="parentLocation.contactPhone" class="flex gap-2 items-center">
        <i-phone-green />
        <a target="_blank" :href="'tel:' + parentLocation.contactPhone">{{ parentLocation.contactPhone }}</a>
      </div>

      <div v-if="parentLocation.contactEmail" class="flex gap-2 items-center">
        <i-mail-green />
        <a target="_blank" :href="'mailto:' + parentLocation.contactEmail">{{ parentLocation.contactEmail }}</a>
      </div>
    </div>

    <div class="flex justify-between">
      <div @click="edit()" class="flex items-center gap-2 justify-center cursor-pointer text-green hover:text-lightGreen">
        <p class="underline">{{t('checks.location-check.edit')}}</p>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
        </svg>
      </div>

      <div @click="remove()" class="flex items-center gap-2 justify-center cursor-pointer text-red hover:text-lightRed">
        <p class="underline">Verwijder</p>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { SearchedLocation } from '@/serializer/SearchedLocation'
import IPersonGreen from '@/components/icons/IPersonGreen.vue'
import IPhoneGreen from '@/components/icons/IPhoneGreen.vue'
import IMailGreen from '@/components/icons/IMailGreen.vue'
import { defineComponent, PropType } from 'vue'
import { Check } from '@/serializer/Check'
import { useI18n } from 'vue-i18n'
import RepositoryFactory from '@/repositories/repositoryFactory'
import { LocationCheckRepository } from '@/repositories/LocationCheckRepository'
import { useNotification } from '@/composable/useNotification'


export default defineComponent({
  components: { IPersonGreen, IPhoneGreen, IMailGreen, },
  name: 'CustomPopup',
  props: {
    location: {
      type: Object as PropType<SearchedLocation>,
      required: false
    },
    parentLocation: {
      type: Object as PropType<any>,
      required: false
    },
    check: {
      type: Object as PropType<Check>
    },
  },
  setup (props, { emit }) {
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    })
    const edit = () => {
      document.body.classList.add('overflow-hidden')
      emit('edit', props.parentLocation)
    }
    const { triggerNotification } = useNotification()


     const patchLocation = async () => {
      if (props?.check?.endpoint && props?.parentLocation) {

        let newArray: any = []
        props.check.value.locations.forEach((locationVal: any) => {
          if (locationVal.id !== props.parentLocation.id) { 
            newArray.push(locationVal)
          }
        })

        await RepositoryFactory.get(LocationCheckRepository)
        .updateLocationCheckRemove(props.check.endpoint, newArray)
        .then((p: any) => {
          triggerNotification(t('sidebars.location-sidebar.form.notification-patched'))
          emit('rl', true)
        })
      } 
    }

    const remove = () => {
      patchLocation()
    }
    return  {
      remove,
      edit,
      t
    }
  }
})
</script>

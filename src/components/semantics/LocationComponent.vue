<template>
  <div>
    <leaflet-map :locations="fakeData" :center="fakeCenter" />
    <custom-button @click="openLocationCreateSidebar()" class="mt-4" text="+ voeg locatie toe" />
    <location-create-sidebar title="create" v-model:sideBarState="createSidebar" @actionSuccess="actionSuccess($event)" />
  </div>
</template>

<script lang="ts">
import LocationCreateSidebar from '../sideBars/LocationCreateSidebar.vue'
import LeafletMap from '@/components/cards/leaflet/leafletMap.vue'
import { CustomButton } from 'vue-3-component-library'
import { Location } from '../../serializer/Location'
import { defineComponent, ref } from 'vue'


export default defineComponent({
  name: 'LocationComponent',
  components: {
    LeafletMap,
    CustomButton,
    LocationCreateSidebar
  },
  props: {
  },
  setup (props, context) {

    const fakeCenter = [51.20923, 4.43815]

    const fakeData = ref<Array<Location>>([
      {
        title: "Lokalen 23ste",
        type: "Hoofdlocatie",
        contactPerson: { name: "Ricardo Acosta Torres", phoneNumber: "+32 484 75 35 74" },
        address: "Essensteenweg 31 2930 Brasschaat",
        latLng: [ 51.20936364460192, 4.43812787770912 ]
      },
      {
        title: "Lokalen 23ste",
        type: "Hoofdlocatie",
        contactPerson: { name: "Ricardo Acosta Torres", phoneNumber: "+32 484 75 35 74" },
        address: "Essensteenweg 31 2930 Brasschaat",
        latLng: [ 51.209487989649645, 4.43943143009983 ] 
      },
      {
        title: "Lokalen 23ste",
        type: "Hoofdlocatie",
        contactPerson: { name: "Ricardo Acosta Torres", phoneNumber: "+32 484 75 35 74" },
        address: "Essensteenweg 31 2930 Brasschaat",
        latLng: [ 51.20946110426235, 4.436100125312806 ]
      }
    ])

    const closeSideBar= (): void => {
      context.emit('closeSidebar')
    }

    const openSideBar= (): void => {
      context.emit('openSidebar')
    }

    const createSidebar = ref<any>({state: 'hide'})

    const openLocationCreateSidebar = (): void => {
      createSidebar.value = {state: 'new'}
    }

    const actionSuccess = (action: string) => {
      if (action === 'POST') {
        console.log('Kamp is succesvol aangemaakt')
      }
      if (action === 'UPDATE') {
        console.log('Kamp is succesvol bewerkt')
      }
      // get locations again to update the data in the map
    }

    return {
      openLocationCreateSidebar,
      createSidebar,
      closeSideBar,
      actionSuccess,
      openSideBar,
      fakeCenter,
      fakeData,
    }
  }
})
</script>

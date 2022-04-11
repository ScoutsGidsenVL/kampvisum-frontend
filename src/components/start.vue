<template>
  <div class="flex h-screen -mt-40">
    <div class="m-auto">
      <loader color="lightGreen" size="20" :isLoading="true" />
    </div>
  </div>
</template>

<script lang="ts">
import router from '@/router'
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import {Loader} from 'vue-3-component-library'

export default defineComponent({
  name: 'start-view',
  components: {
    loader: Loader
  },
  setup() {
    const store = useStore()
    // Custom start view to work with the inuits oicd/Keycloak when vue is not in history mode

    // check if auth code from Keycloack is there
    let params = new URL(document.location.toString()).searchParams
    let code = params.get('code')

    if (code) {
      // Fetch the tokens and remove the url params on succes and redirect to /#/ no history mode path
      store.dispatch('fetchTokens', code).then(() => {
        const url = new URL(location.toString())
        url.searchParams.delete('code')
        url.searchParams.delete('session_state')
        window.location.replace(url.toString())
      })
    } else {
      let redirectUrl = sessionStorage.getItem('redirectUrl')
      console.log('redirectUrl: ', redirectUrl)
      if (redirectUrl) {
        router.push(redirectUrl === '/start' || redirectUrl === '/' ? '/kampvisum-home' : redirectUrl)  
      }
    }
  },
})
</script>

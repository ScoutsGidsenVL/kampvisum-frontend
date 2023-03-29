import { createStore } from 'vuex'

import config from './modules/config'
import user from './modules/user'
import keycloak from './modules/keycloak'

const store = createStore({
  modules: {
    config,
    user,
    keycloak
  },
})

export default store

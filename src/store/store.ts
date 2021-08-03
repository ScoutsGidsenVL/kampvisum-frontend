import { createStore } from 'vuex'

import config from './modules/config'
import user from './modules/user'

const store = createStore({
  modules: {
    config,
    user,
  },
})

export default store

import StaticFileRepository from './repositories/staticFileRepository'
import RepositoryFactory from './repositories/repositoryFactory'
import AuthRepository from './repositories/authRepository'
import MasterConfig from './models/config/masterConfig'
import 'vue-3-component-library/lib/index.css'
import { createI18n } from 'vue-i18n'
const VueLuxon = require('vue-luxon')
import store from './store/store'
import './registerServiceWorker'
import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import { useInternetHelper } from './helpers/internetHelper'
import useAuthHelper, { isLoggedIn } from './helpers/authHelper'
import { useOfflineData } from './composable/useOfflineData'
import Keycloak from 'keycloak-js';
import getClient from "./keycloak-config";
import { OnLoadOptionsType } from './keycloak-config'

declare module 'keycloak-js' {
  interface KeycloakInstance {
    parseCallback(url: string): any;
  }
}
const nl = require('./locales/nl.json')
const { isInternetActive } = useInternetHelper()
let { logoutFromGA } = useAuthHelper()
const isOnline = require('is-online')
const { initDb } = useOfflineData()

initDb()
isOnline().then((isOnlineResult: any) => {
  isInternetActive.value = isOnlineResult
  new StaticFileRepository().getFile('config.json').then(async (result: any) => {

    const i18n = createI18n({
      legacy: false,
      locale: 'nl',
      fallbackLocale: 'nl',
      globalInjection: true,
      fallbackWarn: false,
      missingWarn: false,
      messages: {
        nl: nl.default,
      },
    })

    const app = createApp(App)
      .use(i18n)
      .use(VueLuxon, {
        output: {
          locale: 'nl',
        },
      })

    let configFile = result
    configFile = new MasterConfig().deserialize(configFile)
    store.dispatch('setConfig', configFile)

    // KEYCLOAK
    let initOptions = getClient();
    const keycloak = Keycloak(initOptions);
    keycloak.init({ onLoad: initOptions.onLoad as OnLoadOptionsType })

    store.dispatch('setKeycloak', keycloak)

    keycloak.onAuthLogout = function () {
      logoutFromGA()
    }

    keycloak.onAuthSuccess = async function () {
      RepositoryFactory.get(AuthRepository)
      .me()
      .then((user: any) => {
        store.dispatch('setUser', user)
        isLoggedIn.value = true
      }).catch((error) => {
        console.log('error: ', error);
      })
    }
    
    app.use(router).use(store).mount('#app')
  })
})


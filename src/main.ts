import StaticFileRepository from './repositories/staticFileRepository'
import RepositoryFactory from './repositories/repositoryFactory'
import AuthRepository from './repositories/authRepository'
import MasterConfig from './models/config/masterConfig'
import { OpenIdConnectPlugin } from 'inuits-vuejs-oidc'
import 'vue-3-component-library/lib/index.css'
import { createI18n } from 'vue-i18n'
const VueLuxon = require('vue-luxon')
import store from './store/store'
import './registerServiceWorker'
import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import { useInternetHelper } from './helpers/internetHelper'
import useAuthHelper  from './helpers/authHelper'
import { useOfflineData } from './composable/useOfflineData'
import Keycloak from 'keycloak-js';
import getClient from "./keycloak-config";
import { OnLoadOptionsType } from './keycloak-config'

// import LitepieDatepicker from 'litepie-datepicker'
const nl = require('./locales/nl.json')
const { isInternetActive } = useInternetHelper()
const { logoutFromGA } = useAuthHelper()
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

    if (configFile.oidc && configFile.oidc.baseUrl && configFile.oidc.clientId) {
      // @ts-ignore
      app.use(OpenIdConnectPlugin, {
        store: store,
        router: router,
        configuration: {
          baseUrl: configFile.oidc.baseUrl,
          serverBaseUrl: configFile.oidc.serverBaseUrl,
          authEndpoint: configFile.oidc.authEndpoint ? configFile.oidc.authEndpoint : 'auth',
          logoutEndpoint: configFile.oidc.logoutEndpoint ? configFile.oidc.logoutEndpoint : 'logout',
          clientId: configFile.oidc.clientId,
          authorizedRedirectRoute: '/',
          serverTokenEndpoint: 'token/',
          serverRefreshEndpoint: 'refresh/',
          InternalRedirectUrl: configFile.oidc.internalRedirectUrl ? configFile.oidc.internalRedirectUrl : '/',
        },
      })
    }

    store.dispatch('setConfig', configFile)
    const config: MasterConfig = store.getters.config

    let redirectUrl = sessionStorage.getItem('redirectUrl')
    if (!redirectUrl) {
      sessionStorage.setItem('redirectUrl', window.location.pathname)
    }

    let params = new URL(document.location.toString()).searchParams
    let code = params.get('code')
    
    if (!store.getters.isLoggedIn && code) {
      await store.dispatch('fetchTokens', code).then(() => {
        window.location.replace(`${config.frontend.baseUrl}/kampvisum-home`)
      })
    } else {
      await RepositoryFactory.get(AuthRepository)
            .me()
            .then((user: any) => {
              store.dispatch('setUser', user)
            }).catch((error) => {
              console.log('error: ', error);
            })
    }

    let initOptions = getClient();
    const keycloak = Keycloak(initOptions);
    keycloak.init({onLoad: initOptions.onLoad as OnLoadOptionsType})
    keycloak.onAuthLogout = function () {
      logoutFromGA()
    }

    app.use(router).use(store).mount('#app')
  })
})


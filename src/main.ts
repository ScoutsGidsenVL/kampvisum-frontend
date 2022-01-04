import StaticFileRepository from './repositories/staticFileRepository'
import RepositoryFactory from './repositories/repositoryFactory'
import AuthRepository from './repositories/authRepository'
import MasterConfig from './models/config/masterConfig'
import { OpenIdConnectPlugin } from 'inuits-vuejs-oidc'
import 'vue-3-component-library/lib/index.css'
import store from './store/store'
import './registerServiceWorker'
import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import { createI18n } from "vue-i18n";

// import LitepieDatepicker from 'litepie-datepicker'
const nl = require("./locales/nl.json")
new StaticFileRepository().getFile('config.json').then((result: any) => {
  const i18n = createI18n({
    legacy: false,
    locale: "nl",
    fallbackLocale: 'nl',
    globalInjection: true,
    fallbackWarn: false,
    missingWarn: false,
    messages: {
      nl: nl.default
    }
  });

  const app = createApp(App).use(i18n)

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

  router.beforeEach((to: any, from: any, next: any) => {
    if (to.matched.some((record: any) => record.meta.requiresOpenIdAuth)) {
      if (store.getters.isLoggedIn) {
        !store.getters.loaded
          ? RepositoryFactory.get(AuthRepository)
              .me()
              .then((user: any) => {
                store.dispatch('setUser', user).then(() => {
                  next()
                })
              })
          : next()
      } else {
        next()
      }
    } else {
      next()
    }
  })

  app.use(router).use(store).mount('#app')
})

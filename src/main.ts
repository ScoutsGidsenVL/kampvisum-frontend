import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store/store'
import './index.css'

import MasterConfig from './models/config/masterConfig'
import { OpenIdConnectPlugin } from 'inuits-vuejs-oidc'
import RepositoryFactory from './repositories/repositoryFactory'
import AuthRepository from './repositories/authRepository'
import StaticFileRepository from './repositories/staticFileRepository'
import i18n from './i18n'

new StaticFileRepository().getFile('config.json').then((result: any) => {
  const app = createApp(App).use(i18n).use(i18n)

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
      console.log('LOG 1')
      if (store.getters.isLoggedIn) {
      console.log('LOG 2')
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

// createApp(App)
//   .use(store)
//   .use(router)
//   .mount('#app')

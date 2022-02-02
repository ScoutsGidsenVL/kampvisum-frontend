/* eslint-disable no-console */

import StaticFileRepository from './repositories/staticFileRepository'
import { register } from 'register-service-worker'
import MasterConfig from './models/config/masterConfig'


let configFile

new StaticFileRepository().getFile('config.json').then((result: any) => {
  configFile = new MasterConfig().deserialize(result)
  if (true) {
    register(`${configFile.frontend.baseUrl}/service-worker.js`, {
      ready () {
        console.log(
          'App is being served from cache by a service worker.\n' +
          'For more details, visit https://goo.gl/AFskqB'
        )
      },
      registered () {
        console.log('Service worker has been registered.')
      },
      cached () {
        console.log('Content has been cached for offline use.')
      },
      updatefound () {
        console.log('New content is downloading.')
      },
      updated () {
        console.log('New content is available; please refresh.')
      },
      offline () {
        console.log('No internet connection found. App is running in offline mode.')
      },
      error (error:any) {
        console.error('Error during service worker registration:', error)
      }
    })
  }
})




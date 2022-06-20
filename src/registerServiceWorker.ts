import { register } from "register-service-worker";
import { useInternetHelper } from "./helpers/internetHelper";
import MasterConfig from "./models/config/masterConfig";
import StaticFileRepository from "./repositories/staticFileRepository";


let configFile

if (process.env.NODE_ENV === "production") {
  new StaticFileRepository().getFile('config.json').then((result: any) => {
    configFile = new MasterConfig().deserialize(result)

    register(`${configFile.frontend.baseUrl}/service-worker.js`, {
    ready() {
      console.log(
        "App is being served from cache by a service worker.\n" +
          "For more details, visit https://goo.gl/AFskqB"
      );

    const { isInternetActive } = useInternetHelper()
    isInternetActive.value = navigator.onLine

    },
    registered() {
      console.log("Service worker has been registered.");
    },
    cached() {
      console.log("Content has been cached for offline use.");
    },
    updatefound() {
      console.log("New content is downloading.");
    },
    updated() {
      console.log("New content is available; please refresh.");
    },
    offline() {
    const { isInternetActive } = useInternetHelper()

    sessionStorage.setItem('oidc-access-token', 'offline');
    sessionStorage.setItem('oidc-refresh-token', 'offline');
    isInternetActive.value = false

    console.log(
      "No internet connection found. App is running in offline mode."
    );

    },
    error(error) {
      console.error("Error during service worker registration:", error);
    },
  });

  })
  
  
}

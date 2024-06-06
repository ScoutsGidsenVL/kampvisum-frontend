import MasterConfig from './models/config/masterConfig'
import store from '@/store/store'

export const enum OnLoadOptions {
  LOGIN_REQUIRED = 'login-required',
  CHECK_SSO = 'check-sso',
  UNDEFINED = 'undefined'
}

export type OnLoadOptionsType = "login-required" | "check-sso" | undefined

export default function getClient() {
  const config: MasterConfig = store.getters.config
  
  let returnClient = {
    url: 'https://login.scoutsengidsenvlaanderen.be/auth',
    realm: "scouts",
    clientId: config.oidc.clientId,
    onLoad: OnLoadOptions.LOGIN_REQUIRED,
    redirectUri: config.frontend.baseUrl,
    checkLoginIframe: true,
    checkLoginIframeInterval: 5
  };
  return returnClient;
}

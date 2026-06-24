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
    // De keycloak-host komt uit config.json (door ansible getemplatet via
    // django_keycloak_hostname): oidc.baseUrl = https://<host>/realms/scouts.
    url: config.oidc.baseUrl.replace('/realms/scouts', ''),
    realm: "scouts",
    clientId: config.oidc.clientId,
    onLoad: OnLoadOptions.LOGIN_REQUIRED,
    redirectUri: config.frontend.baseUrl,
    checkLoginIframe: true,
    checkLoginIframeInterval: 5
  };
  return returnClient;
}

import MasterConfig from './models/config/masterConfig'
import store from '@/store/store'

export const enum OnLoadOptions {
  LOGIN_REQUIRED = 'login-required',
  CHECK_SSO = 'check-sso',
  UNDEFINED = 'undefined',
}

export type OnLoadOptionsType = 'login-required' | 'check-sso' | undefined

export default function getClient() {
  const config: MasterConfig = store.getters.config

  let returnClient = {
    // De keycloak-host volgt config.json (oidc.baseUrl = https://<host>/realms/scouts),
    // zodat dezelfde host gebruikt wordt als de backend i.p.v. een hardgecodeerde prod-url.
    url: config.oidc.baseUrl.replace('/realms/scouts', ''),
    realm: 'scouts',
    clientId: config.oidc.clientId,
    onLoad: OnLoadOptions.LOGIN_REQUIRED,
    redirectUri: config.frontend.baseUrl,
    // checkLoginIframe uit: de session-status iframe loopt vast tegen Keycloak 26
    // door de SameSite-cookieregels.
    checkLoginIframe: false,
  }
  return returnClient
}

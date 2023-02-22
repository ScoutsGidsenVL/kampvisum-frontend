export const enum OnLoadOptions {
  LOGIN_REQUIRED = 'login-required',
  CHECK_SSO = 'check-sso',
  UNDEFINED = 'undefined'
}

export type OnLoadOptionsType = "login-required" | "check-sso" | undefined

export default function getClient() {
  let returnClient = {
    url: "https://login-dev.scoutsengidsenvlaanderen.be/auth",
    realm: "scouts",
    clientId: 'groepsadmin-production-client',
    onLoad: OnLoadOptions.LOGIN_REQUIRED,
    redirectUri: 'localhost:8040',
    checkLoginIframe: true, 
    checkLoginIframeInterval: 5
  };
  return returnClient;
}

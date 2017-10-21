import { NullValidationHandler, OAuthService } from 'angular-oauth2-oidc';

import { environment } from '../../../environments/environment';

function hasExpiredAccessToken(oauthService: OAuthService) {
  return oauthService.getAccessToken() && !oauthService.hasValidAccessToken();
}

export function initializeOAuth(oauthService: OAuthService) {
  oauthService.configure(environment.authConfig);
  oauthService.tokenValidationHandler = new NullValidationHandler;

  return () => oauthService
    .tryLogin()
    .then(() => {
      if (hasExpiredAccessToken(oauthService)) {
        oauthService.silentRefresh();
      }
    })
    .then(() => { location.hash = ''; });
}

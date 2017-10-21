import { Store } from '@ngrx/store';
import { NullValidationHandler, OAuthService } from 'angular-oauth2-oidc';

import { environment } from '../../../environments/environment';
import { LoadProfile } from '../actions/user.actions';

export function initializeOAuth(oauthService: OAuthService, store: Store<any>) {
  oauthService.configure(environment.authConfig);
  oauthService.tokenValidationHandler = new NullValidationHandler;

  return async () => {
    await oauthService.tryLogin();

    location.hash = '';

    if (oauthService.hasValidAccessToken()) {
      store.dispatch(new LoadProfile());
    }
  };
}

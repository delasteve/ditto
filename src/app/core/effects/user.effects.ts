import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { OAuthService } from 'angular-oauth2-oidc';
import { map, switchMap, tap } from 'rxjs/operators';

import {
  LOAD_PROFILE,
  LOGIN,
  LOGOUT,
  ProfileLoaded,
} from '../actions/user.actions';
import { UserProfile } from '../models/spotify/user-profile';
import { SpotifyService } from '../services/spotify.service';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private oauthService: OAuthService,
    private spotifyService: SpotifyService,
  ) { }

  @Effect({ dispatch: false })
  userLogin$ = this.actions$
    .ofType(LOGIN)
    .pipe(tap(() => this.oauthService.initImplicitFlow()));

  @Effect({ dispatch: false })
  userLogout$ = this.actions$
    .ofType(LOGOUT)
    .pipe(tap(() => this.oauthService.logOut()));

  @Effect()
  loadUserProfile$ = this.actions$
    .ofType(LOAD_PROFILE)
    .pipe(
    switchMap(() => this.spotifyService
      .getCurrentUser()
      .pipe(map((profile: UserProfile) => new ProfileLoaded(profile)))));
}

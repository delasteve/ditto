import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { OAuthService } from 'angular-oauth2-oidc';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { of } from 'rxjs/observable/of';

import { MockSpotifyService } from '../../../../test/core/services/spotify.service';
import { MockOAuthService } from '../../../../test/oauth.service';
import { LoadProfile, Login, Logout, ProfileLoaded } from '../actions/user.actions';
import { UserProfile } from '../models/spotify/user-profile';
import { SpotifyService } from '../services/spotify.service';
import { UserEffects } from './user.effects';

describe('UserEffects', () => {
  let effects: UserEffects;
  let actions: ReplaySubject<any>;
  let spotifyService: MockSpotifyService;
  let oauthService: MockOAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserEffects,
        { provide: OAuthService, useClass: MockOAuthService },
        { provide: SpotifyService, useClass: MockSpotifyService },
        provideMockActions(() => actions),
      ],
    });
  });

  beforeEach(() => {
    spotifyService = TestBed.get(SpotifyService);
    oauthService = TestBed.get(OAuthService);
    effects = TestBed.get(UserEffects);

    actions = new ReplaySubject(1);
  });

  describe('userLogin$', () => {
    it('should initiate implicit grant flow', () => {
      actions.next(new Login());

      effects
        .userLogin$
        .subscribe(() => {
          expect(oauthService.initImplicitFlow).toHaveBeenCalledTimes(1);
        });
    });
  });

  describe('userLogout$', () => {
    it('should remove the access_token from localstorage', () => {
      actions.next(new Logout());

      effects
        .userLogout$
        .subscribe(() => {
          expect(oauthService.logOut).toHaveBeenCalledTimes(1);
        });
    });
  });

  describe('loadUserProfile$', () => {
    it('should dispatch UserProfileLoaded', () => {
      const profile: Partial<UserProfile> = { display_name: 'Test User' };
      spotifyService.getCurrentUser
        .and.returnValue(of(profile));
      actions = new ReplaySubject(1);

      actions.next(new LoadProfile());

      effects
        .loadUserProfile$
        .subscribe(result => {
          expect(result).toEqual(new ProfileLoaded(profile as UserProfile));
        });
    });

    xit('should dispatch UserProfileLoadFailed');
  });
});

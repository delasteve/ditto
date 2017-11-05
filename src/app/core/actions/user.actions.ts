import { Action } from '@ngrx/store';

import { UserProfile } from '../models/spotify/user-profile';

export const LOGIN = '[User] Login';
export const LOGOUT = '[User] Logout';
export const LOAD_PROFILE = '[User] Load Profile';
export const PROFILE_LOADED = '[User] Profile Loaded';

export class Login implements Action {
  readonly type = LOGIN;
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class LoadProfile implements Action {
  readonly type = LOAD_PROFILE;
}

export class ProfileLoaded implements Action {
  readonly type = PROFILE_LOADED;

  constructor(public readonly payload: UserProfile) { }
}

export type Actions
  = Login
  | Logout
  | LoadProfile
  | ProfileLoaded;

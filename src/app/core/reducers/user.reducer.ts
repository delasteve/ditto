import { Action } from '@ngrx/store';

import * as UserActions from '../actions/user.actions';
import { UserProfile } from '../models/user-profile';

export interface State {
  profile: UserProfile | null;
}

export const initialState: State = {
  profile: null,
};

export function reducer(state: State = initialState, action: UserActions.Actions): State {
  if (!action) { return state; }

  switch (action.type) {
    case UserActions.PROFILE_LOADED:
      return {
        ...state,
        profile: action.payload,
      };

    case UserActions.LOGOUT:
      return {
        ...state,
        profile: null,
      };

    default:
      return state;
  }
}

export const selectUserProfile = (state: State) => state.profile;

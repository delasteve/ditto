import { Action, ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromUser from './user.reducer';

export interface State {
  user: fromUser.State;
}

export const reducers: ActionReducerMap<State> = {
  user: fromUser.reducer,
};

// Feature Selectors
export const userSelector = createFeatureSelector<fromUser.State>('user');

// User Selectors
export const selectUserProfile = createSelector(userSelector, fromUser.selectUserProfile);

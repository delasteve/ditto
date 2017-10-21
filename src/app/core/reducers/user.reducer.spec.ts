import { Logout, ProfileLoaded } from '../actions/user.actions';
import { UserProfile } from '../models/user-profile';
import { initialState, reducer } from './user.reducer';

describe('#reducer - CreatePetitionerForm', () => {
  it('should retain current state when action is null', () => {
    const result = reducer(undefined, null);

    expect(result).toEqual(initialState);
  });

  it('should retain current state when state change is unknown', () => {
    const action = { type: 'Not a real action' } as any;

    const result = reducer(undefined, action);

    expect(result).toEqual(initialState);
  });

  it('should set the user profile', () => {
    const profile: Partial<UserProfile> = { display_name: 'Test User' };
    const action = new ProfileLoaded(profile as UserProfile);
    const expectedState = Object.assign({}, initialState, { profile });

    const result = reducer(initialState, action);

    expect(result).toEqual(expectedState);
  });

  it('should clear the user profile when user logs out', () => {
    const profile: Partial<UserProfile> = { display_name: 'Test User' };
    const state = Object.assign({}, initialState, { profile });
    const expectedState = { profile: null };
    const action = new Logout();

    const result = reducer(state, action);

    expect(result).toEqual(expectedState);
  });
});

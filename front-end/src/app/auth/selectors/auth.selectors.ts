import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../reducers/auth.reducer'; 

const selectAuthState = createFeatureSelector<AuthState>('auth');


export const selectJwt = createSelector(
  selectAuthState,
  (state: AuthState) => state.jwt
);

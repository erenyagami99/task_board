// auth.reducer.ts

import { createReducer, on } from '@ngrx/store';
import { setJwt, clearJwt } from '../actions/auth.actions';

export interface AuthState {
  jwt: string | null;
}

export const initialState: AuthState = {
  jwt: null,
};

const authReducer = createReducer(
  initialState,
  on(setJwt, (state, { jwt }) => ({ ...state, jwt })),
  on(clearJwt, (state) => ({ ...state, jwt: null })),
);

export function reducer(state: AuthState | undefined, action: any) {
  return authReducer(state, action);
}

export const getJwt = (state: AuthState) => state.jwt;

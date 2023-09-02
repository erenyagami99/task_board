import { createAction, props } from '@ngrx/store';

export const setJwt = createAction('[Auth] Set JWT', props<{ jwt: string }>());
export const clearJwt = createAction('[Auth] Clear JWT');
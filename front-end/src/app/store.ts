import { StoreModule } from '@ngrx/store';
import { reducer as authReducer } from './auth/reducers/auth.reducer'; 

const initialState = {};

export const store = StoreModule; 


export interface AppState {
  auth: {
    jwt: string | null; 
  };
}

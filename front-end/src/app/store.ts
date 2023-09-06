import { StoreModule } from '@ngrx/store';

export const store = StoreModule;

export interface AppState {
  auth: {
    jwt: string | null;
  };
}

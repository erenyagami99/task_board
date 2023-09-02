// auth.module.ts

import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { reducer } from './reducers/auth.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature('auth', reducer),
  ],
})
export class AuthModule {}

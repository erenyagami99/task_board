import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer as authReducer } from './auth/reducers/auth.reducer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, MAT_DATE_FORMATS } from '@angular/material/core';
import { CreatePopupComponent } from './popups/createPopup/createPopup.component';
import { UpdatePopupComponent } from './popups/updatePopup/updatePopup.component';
import { DeletePopupComponent } from './popups/deletePopup/deletePopup.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    LoginComponent,
    RegisterComponent,
    UpdatePopupComponent,
    CreatePopupComponent,
    DeletePopupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ auth: authReducer }),
    EffectsModule.forRoot([]),
    BrowserAnimationsModule,
    DragDropModule,
  ],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }],
  bootstrap: [AppComponent],
})
export class AppModule {}

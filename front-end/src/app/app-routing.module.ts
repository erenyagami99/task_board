import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './auth.guard'
import { NoAuthGuard } from './noauth.guard';

const routes: Routes = [
  {
    path:'',component:HomeComponent, canActivate: [AuthGuard],
  },
  {
    path:'login',component:LoginComponent,canActivate: [NoAuthGuard]
  },
  {
    path:'register',component:RegisterComponent,canActivate: [NoAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

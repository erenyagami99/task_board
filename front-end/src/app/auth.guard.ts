import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const jwtToken = localStorage.getItem('jwtToken'); // Replace 'jwtToken' with the actual key used in local storage

    if (jwtToken) {
      return true; // Allow access to the route if JWT token is present in local storage
    } else {
      // Redirect to the login page or another route if JWT token is not available
      this.router.navigate(['/login']); // Replace '/login' with your login route
      return false;
    }
  }
}

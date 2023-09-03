import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const jwtToken = localStorage.getItem('jwtToken'); // Replace 'jwtToken' with the actual key used in local storage

    if (jwtToken) {
      // A token is present, redirect to the home page or another route
      this.router.navigate(['/']); // Replace '/home' with the appropriate route
      return false;
    } else {
      return true; // Allow access to the login and register pages
    }
  }
}

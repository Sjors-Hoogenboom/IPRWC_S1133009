import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  constructor(private router: Router) {}

  isLoggedIn(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  login(): void {
    this.isAuthenticated.next(true);
    localStorage.setItem('auth', 'true');
    this.router.navigate(['/']);
  }

  logout(): void {
    this.isAuthenticated.next(false);
    localStorage.removeItem('auth');
    this.router.navigate(['/']);
  }

  checkAuthStatus(): void {
    const authStatus = localStorage.getItem('auth') === 'true';
    this.isAuthenticated.next(authStatus);
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  private username = new BehaviorSubject<string | null>(null);

  constructor(private router: Router) {
    this.checkAuthStatus()
  }

  isLoggedIn(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  getUsername(): Observable<string | null> {
    return this.username.asObservable();
  }

  login(jwtToken: string): void {
    localStorage.setItem('token', jwtToken);
    this.decodeToken(jwtToken);
    this.isAuthenticated.next(true);
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

  private decodeToken(token: string): void {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.username.next(payload.sub || 'User');
    } catch (error) {
      console.error('Error decoding token', error);
      this.username.next(null);
    }
  }
}

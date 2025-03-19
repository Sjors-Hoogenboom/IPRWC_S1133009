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
    this.restoreAuthState()
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
  }

  logout(): void {
    this.isAuthenticated.next(false);
    localStorage.removeItem('token');
  }

  private restoreAuthState(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.decodeToken(token);
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }

  private decodeToken(token: string): void {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.username.next(payload.name || 'User');
    } catch (error) {
      console.error('Error decoding token', error);
      this.username.next(null);
    }
  }
}

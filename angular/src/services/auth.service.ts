import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  private username = new BehaviorSubject<string | null>(null);
  private role = new BehaviorSubject<string | null>(null);

  constructor(private router: Router, private http: HttpClient) {
    this.restoreAuthState()
  }

  isLoggedIn(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  getUsername(): Observable<string | null> {
    return this.username.asObservable();
  }

  hasRole(role: string): Observable<boolean> {
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    };

    return this.http.get<boolean>(`http://localhost:8080/api/auth/has-role?role=${role}`, { headers });
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
      this.role.next(payload.role || null);
    } catch (error) {
      console.error('Error decoding token', error);
      this.username.next(null);
    }
  }
}

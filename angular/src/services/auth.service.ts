import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  private username = new BehaviorSubject<string | null>(null);
  private role = new BehaviorSubject<string | null>(null);

  constructor(private router: Router, private http: HttpClient) {
    this.restoreAuthState();
  }

  isLoggedIn(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  getUsername(): Observable<string | null> {
    return this.username.asObservable();
  }

  getRole(): Observable<string | null> {
    return this.role.asObservable();
  }

  hasRole(role: string): Observable<boolean> {
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    };

    return this.http.get<boolean>(`${environment.apiUrl}/api/auth/has-role?role=${role}`, { headers });
  }

  login(jwtToken: string): void {
    localStorage.setItem('token', jwtToken);
    this.decodeToken(jwtToken);
    this.isAuthenticated.next(true);

    this.hasRole("ADMIN").subscribe((isAdmin) => {
      if (isAdmin) {
        this.role.next("ADMIN");
      }
    });
  }

  logout(): void {
    this.isAuthenticated.next(false);
    this.username.next(null);
    this.role.next(null);
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  private restoreAuthState(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.decodeToken(token);
      this.isAuthenticated.next(true);

      this.hasRole("ADMIN").subscribe((isAdmin) => {
        if (isAdmin) {
          this.role.next("ADMIN");
        } else {
          this.role.next(null);
        }
      });

    } else {
      this.isAuthenticated.next(false);
      this.role.next(null);
    }
  }

  private decodeToken(token: string): void {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.username.next(payload.name || 'User');
      this.role.next(payload.role || 'USER');
    } catch (error) {
      console.error(error);
      this.username.next(null);
      this.role.next(null);
    }
  }
}

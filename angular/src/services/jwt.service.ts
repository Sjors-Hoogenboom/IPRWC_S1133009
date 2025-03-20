import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from '../environments/environment';

const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class JwtService {

 private http = inject(HttpClient);

  register(signRequest: any): Observable<any>{
    return this.http.post(`${baseUrl}/signup`, signRequest);
  }

  login(loginRequest: any): Observable<any>{
    return this.http.post(`${baseUrl}/login`, loginRequest);
  }
}

import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const baseUrl = ["http://localhost:8080/"]

@Injectable({
  providedIn: 'root'
})
export class JwtService {

 private http = inject(HttpClient);

  register(signRequest: any): Observable<any>{
    return this.http.post(baseUrl + "signup", signRequest)
  }
}

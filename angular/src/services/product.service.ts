import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/api/products`;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  addProduct(product: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.post<any>(this.apiUrl, product, { headers });
  }

  deleteProduct(productId: string): Observable<void> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    });

    return this.http.delete<void>(`${this.apiUrl}/${productId}`, { headers });
  }
}

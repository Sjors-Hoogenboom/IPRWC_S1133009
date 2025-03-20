import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../environments/environment';

interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  stock: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartKey = 'shopping_cart';
  private cartItemCount = new BehaviorSubject<number>(0);
  private apiUrl = `${environment.apiUrl}/api/orders`;

  constructor(private http: HttpClient) {
    this.updateCartCount();
  }

  getCart(): CartItem[] {
    return JSON.parse(localStorage.getItem(this.cartKey) || '[]');
  }

  getCartCount() {
    return this.cartItemCount.asObservable();
  }

  addToCart(product: CartItem) {
    let cart = this.getCart();
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      if (existingItem.quantity < existingItem.stock) {
        existingItem.quantity++;
      }
    } else {
      product.quantity = 1;
      cart.push(product);
    }

    localStorage.setItem(this.cartKey, JSON.stringify(cart));
    this.updateCartCount();
  }

  updateCart(cart: CartItem[]) {
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
    this.updateCartCount();
  }

  removeFromCart(productId: string) {
    let cart = this.getCart().filter(item => item.id !== productId);
    this.updateCart(cart);
    this.updateCartCount();
  }

  updateCartCount() {
    const totalItems = this.getCart().reduce((count, item) => count + item.quantity, 0);
    this.cartItemCount.next(totalItems);
  }

  placeOrder(customerEmail: string): Observable<any> {
    const cart = this.getCart();
    if (cart.length === 0) return of(null);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    const orderData = {
      customerEmail: customerEmail,
      orderItems: cart.map(item => ({
        productId: item.id,
        productName: item.name,
        quantity: item.quantity,
        price: item.price
      }))
    };

    return this.http.post<any>(this.apiUrl, orderData, { headers });
  }

  clearCart() {
    localStorage.removeItem(this.cartKey);
    this.updateCartCount();
  }
}

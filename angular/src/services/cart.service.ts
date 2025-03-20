import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = [];
  private cartItemCount = new BehaviorSubject<number>(0);

  constructor() {}

  getCartItemCount(): Observable<number> {
    return this.cartItemCount.asObservable();
  }

  addToCart(product: any) {
    this.cartItems.push(product);
    this.cartItemCount.next(this.cartItems.length);
  }

  getCartItems(): any[] {
    return this.cartItems;
  }
}

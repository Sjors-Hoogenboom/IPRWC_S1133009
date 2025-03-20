import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private storageKey = 'shoppingCart';
  private cartItems: CartItem[] = [];
  private cartItemCount = new BehaviorSubject<number>(0);

  constructor() {
    this.loadCartFromStorage();
  }

  private saveCartToStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.cartItems));
    this.cartItemCount.next(this.getTotalItems());
  }

  private loadCartFromStorage() {
    const savedCart = localStorage.getItem(this.storageKey);
    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);
      this.cartItemCount.next(this.getTotalItems());
    }
  }

  getCartItemCount(): Observable<number> {
    return this.cartItemCount.asObservable();
  }

  getCartItems() {
    return [...this.cartItems];
  }

  addToCart(product: CartItem) {
    const existingItem = this.cartItems.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cartItems.push({ ...product, quantity: 1 });
    }
    this.saveCartToStorage();
  }

  removeFromCart(productId: string) {
    this.cartItems = this.cartItems.filter(item => item.id !== productId);
    this.saveCartToStorage();
  }

  getTotalItems(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  clearCart() {
    this.cartItems = [];
    localStorage.removeItem(this.storageKey);
    this.cartItemCount.next(0);
  }
}

import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

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

  constructor() {this.updateCartCount();}

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
  }

  updateCart(cart: CartItem[]) {
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
  }

  removeFromCart(productId: string) {
    let cart = this.getCart().filter(item => item.id !== productId);
    this.updateCart(cart);
  }

  clearCart() {
    localStorage.removeItem(this.cartKey);
  }

  private updateCartCount() {
    const totalItems = this.getCart().reduce((count, item) => count + item.quantity, 0);
    this.cartItemCount.next(totalItems);
  }
}

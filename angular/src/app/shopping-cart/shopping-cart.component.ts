import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import {RouterLink} from '@angular/router';

interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  stock: number;
}

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink],
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent implements OnInit {
  cart: CartItem[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cart = this.cartService.getCart();
  }

  increaseQuantity(item: CartItem) {
    if (item.quantity < item.stock) {
      this.cartService.addToCart(item);
      this.loadCart();
    }
  }

  decreaseQuantity(item: CartItem) {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateCart();
    } else {
      this.removeItem(item.id);
    }
  }

  removeItem(productId: string) {
    this.cartService.removeFromCart(productId);
    this.loadCart();
  }

  updateCart() {
    localStorage.setItem('shopping_cart', JSON.stringify(this.cart));
    this.cartService.updateCartCount();
    this.loadCart();
  }

  getTotalPrice(): number {
    return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  trackById(index: number, item: any): string {
    return item.id;
  }
}

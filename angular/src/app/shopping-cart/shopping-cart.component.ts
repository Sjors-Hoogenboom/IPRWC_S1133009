import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../services/auth.service';

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
  customerEmail: string | null = null;
  orderStatus: string = '';

  constructor(private cartService: CartService,
              private authService: AuthService,
              private router: Router) {}

  ngOnInit() {
    this.loadCart();
    this.authService.getUsername().subscribe(email => {
      this.customerEmail = email;
    });
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

  placeOrder() {
    if (!this.customerEmail) {
      this.router.navigate(['/register']);
      return;
    }

    this.cartService.placeOrder(this.customerEmail).subscribe({
      next: () => {
        this.orderStatus = 'Order placed successfully! (Stock lowered and saved in db)';
        setTimeout(() => {
          this.cartService.clearCart();
          this.cart = [];
        }, 10000)
      },
      error: () => {
        this.orderStatus = 'Order failed. Please try again.';
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {CommonModule, DecimalPipe} from '@angular/common';
import {AuthService} from '../../services/auth.service';
import {ProductService} from '../../services/product.service';
import {CartService} from '../../services/cart.service';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  stock: number;
  imageUrl?: string;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  standalone: true,
  imports: [
    DecimalPipe,
    CommonModule
  ],
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  isAdmin = false;
  dropdownOpen:  Record<string, boolean> = {};

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.loadProducts();
    this.authService.hasRole('ADMIN').subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (error) => {
        console.error("Error loading products:", error);
      }
    });
  }


  trackById(index: number, product: any): number {
    return product.id;
  }

  toggleDropdown(productId: string, event: Event) {
    event.stopPropagation();
    this.dropdownOpen[productId] = !this.dropdownOpen[productId];
  }

  deleteProduct(productId: string) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(productId).subscribe(() => {
        this.products = this.products.filter(product => product.id !== productId);
      });
    }
  }

  addToCart(product: Product) {
    this.cartService.addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl || '',
      quantity: 1,
      stock: product.stock
    });
  }
}

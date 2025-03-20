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
  isAdmin: boolean = false;
  dropdownOpen: { [key: string]: boolean } = {};

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
    this.http.get<Product[]>('http://localhost:8080/api/products')
      .subscribe(data => {
        this.products = data;
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

  addToCart(product: any) {
    this.cartService.addToCart(product)
  }
}

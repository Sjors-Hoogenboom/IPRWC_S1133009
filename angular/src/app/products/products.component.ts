import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {CommonModule, DecimalPipe} from '@angular/common';

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

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<Product[]>('http://localhost:8080/api/products')
      .subscribe(data => {
        this.products = data;
      });
  }

  trackById(index: number, product: any): number {
    return product.id;
  }

  addToCart(product: any) {
    console.log("Added to cart:", product);
  }
}

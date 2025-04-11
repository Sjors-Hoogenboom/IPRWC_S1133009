import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {RouterModule} from '@angular/router';
import {CartService} from '../../services/cart.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  imports: [RouterModule, CommonModule],
  standalone: true,
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  username: string | null = null;
  isAdmin = false;
  cartItemCount = 0;

  constructor(private authService: AuthService, private cartService: CartService) {}

  ngOnInit() {
    this.authService.isLoggedIn().subscribe(status => {
      this.isLoggedIn = status;
    });
    this.authService.getUsername().subscribe(name => {
      this.username = name;
    });
    this.authService.getRole().subscribe(role => {
      this.isAdmin = role === 'ADMIN';
    });
    this.cartService.getCartCount().subscribe(count => {
      this.cartItemCount = count;
    });
  }

  logout() {
    this.authService.logout();
    this.isAdmin = false;
  }
}

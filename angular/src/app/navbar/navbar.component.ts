import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  imports: [RouterModule],
  standalone: true,
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  username: string | null = null;
  isAdmin = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.isLoggedIn().subscribe(status => {
      this.isLoggedIn = status;
    });
    this.authService.getUsername().subscribe(name => {
      this.username = name;
    });
    this.authService.getRole().subscribe(role => {
      this.isAdmin = role === 'ADMIN';
      console.log("Navbar updated, isAdmin:", this.isAdmin); // Debug log
    });
  }

  logout() {
    this.authService.logout();
    this.isAdmin = false;
  }
}

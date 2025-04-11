import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {JwtService} from '../../services/jwt.service';
import {Router, RouterOutlet} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterOutlet
  ],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;
  status: 'idle' | 'success' | 'error' = 'idle';
  message = '';

  constructor(
    private service: JwtService,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmitForm() {
    if (this.loginForm.invalid) return;

    this.status = 'idle';
    this.message = '';

    this.service.login(this.loginForm.value).subscribe({
      next: (response) => {
        if (response.jwtToken) {
          this.status = 'success';
          this.message = 'Login successful! Redirecting...';

          localStorage.setItem('token', response.jwtToken);

          setTimeout(() => {
            this.authService.login(response.jwtToken);
            this.router.navigate(['/']);
          }, 2000);
        }
      },
      error: () => {
        this.status = 'error';
        this.message = 'Login failed';
      }
    });
  }
}

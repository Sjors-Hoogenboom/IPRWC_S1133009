import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {JwtService} from '../../services/jwt.service';
import {RouterOutlet} from '@angular/router';

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
  message: string = '';

  constructor(
    private service: JwtService,
    private fb: FormBuilder
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
          this.message = 'Login successful!';
          localStorage.setItem('token', response.jwtToken);
          setTimeout(() => {
            window.location.href = '/';
          }, 1500);
        }
      },
      error: () => {
        this.status = 'error';
        this.message = 'Login failed';
      }
    });
  }
}

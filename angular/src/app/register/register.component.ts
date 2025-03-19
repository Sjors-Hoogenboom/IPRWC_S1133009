import {Component} from '@angular/core';
import {JwtService} from '../../services/jwt.service';
import {
  AbstractControl,
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  standalone: true,
  styleUrl: './register.component.scss'
})
export class RegisterComponent{
  registerForm!: FormGroup ;
  status: 'idle' | 'success' | 'error' = 'idle';
  message: string = '';

  constructor(
    private service: JwtService,
    private fb: FormBuilder
  ) {
    const formOptions: AbstractControlOptions = { validators: this.passwordMatchValidator };
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    }, formOptions);
  }

  passwordMatchValidator: ValidatorFn = (control: AbstractControl) => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    return password !== confirmPassword ? { passwordMismatch: true } : null;
  };


  onSubmitForm() {
    if (this.registerForm.invalid) return;

    this.status = 'idle';
    this.message = '';

    this.service.register(this.registerForm.value).subscribe({
      next: (response) => {
        this.status = 'success';
        this.message = response?.message || 'Account created successfully!';
      },
      error: (err) => {
        console.error('Registration error:', err);
        this.status = 'error';
        this.message = 'Registration failed. Please try again.';
      }
    });
  }
}

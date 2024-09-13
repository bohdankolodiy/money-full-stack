import { Component } from '@angular/core';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  AbstractControl,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { IAuthBody } from '../../shared/interfaces/auth.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required]),
  });

  get email(): AbstractControl {
    return this.loginForm.get('email')!;
  }
  get password(): AbstractControl {
    return this.loginForm.get('email')!;
  }

  get passwordError() {
    return 'Field is required';
  }

  get emailError() {
    return this.email.hasError('email')
      ? 'Not a valid email'
      : 'Field is required';
  }

  constructor(private authService: AuthService) {}

  submitForm() {
    if (this.loginForm.invalid) return;

    this.authService
      .login(this.loginForm.getRawValue() as IAuthBody)
      .subscribe();
  }
}

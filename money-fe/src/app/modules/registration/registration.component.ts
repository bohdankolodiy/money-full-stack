import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth/auth.service';
import { IAuthBody } from '../../shared/interfaces/auth.interface';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export class RegistrationComponent {
  passwordVisibility: boolean = true;
  passwordConfirmVisibility: boolean = true;

  registrationForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required]),
    confirmPassword: new FormControl<string>('', [
      Validators.required,
      this.confirmPassValidator(),
    ]),
  });

  get email(): AbstractControl {
    return this.registrationForm.get('email')!;
  }
  get password(): AbstractControl {
    return this.registrationForm.get('password')!;
  }
  get confirmPassword(): AbstractControl {
    return this.registrationForm.get('confirmPassword')!;
  }

  get passwordError() {
    return 'Field is required';
  }

  get confirmPasswordError() {
    return this.confirmPassword.hasError('required')
      ? 'Field is required'
      : 'This value should be the same as password';
  }

  get emailError() {
    return this.email.hasError('email')
      ? 'Not a valid email'
      : 'Field is required';
  }

  constructor(
    private authService: AuthService,
  ) {}

  submitForm() {
    if (this.registrationForm.invalid) return;
    const body: IAuthBody = {
      email: this.email.value,
      password: this.password.value,
    };
    this.authService
      .registration(body)
      .subscribe();
  }

  confirmPassValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>
      this.registrationForm?.value?.password !== control.value
        ? { notmatch: 'This value should be the same as password' }
        : null;
  }
}

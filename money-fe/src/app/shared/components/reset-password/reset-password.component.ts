import { Component, DestroyRef, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
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
import { MatIconModule } from '@angular/material/icon';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    RouterModule,
    MatIconModule,
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent implements OnInit {
  isLoading: boolean = false;
  passwordVisibility: boolean = true;
  passwordConfirmVisibility: boolean = true;

  token: string = '';

  resetPasswordForm = new FormGroup({
    password: new FormControl<string>('', [Validators.required]),
    confirmPassword: new FormControl<string>('', [
      Validators.required,
      this.confirmPassValidator(),
    ]),
  });

  get password(): AbstractControl {
    return this.resetPasswordForm.get('password')!;
  }
  get confirmPassword(): AbstractControl {
    return this.resetPasswordForm.get('confirmPassword')!;
  }

  get passwordError() {
    return 'Field is required';
  }

  get confirmPasswordError() {
    return this.confirmPassword.hasError('required')
      ? 'Field is required'
      : 'This value should be the same as password';
  }

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,

    private destroyRef: DestroyRef,
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParams['token'];
  }

  onResetPassword() {
    if (this.resetPasswordForm.invalid || !this.token) return;
    const body = {
      password: this.password.value,
      token: this.token,
    };
    this.authService
      .resetPassword(body)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  confirmPassValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>
      this.resetPasswordForm?.value?.password !== control.value
        ? { notmatch: 'This value should be the same as password' }
        : null;
  }
}

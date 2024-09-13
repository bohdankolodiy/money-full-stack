import { Component, DestroyRef } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss',
})
export class ForgetPasswordComponent {
  email = new FormControl<string>('', [Validators.email, Validators.required]);

  constructor(
    private auth: AuthService,
    private destroyRef: DestroyRef,
  ) {}

  get emailError() {
    return this.email.hasError('email')
      ? 'Not a valid email'
      : 'Field is required';
  }

  sendResetMail() {
    if (this.email.invalid) return;
    this.auth
      .forgetPassword(this.email.getRawValue()!)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }
}

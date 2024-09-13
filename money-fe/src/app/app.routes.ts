import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./modules/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'registration',
    loadComponent: () =>
      import('./modules/registration/registration.component').then(
        (m) => m.RegistrationComponent,
      ),
  },
  {
    path: 'wait-email/:title',
    loadComponent: () =>
      import('./shared/components/wait-email/wait-email.component').then(
        (m) => m.WaitEmailComponent,
      ),
  },
  {
    path: 'forget-password',
    loadComponent: () =>
      import(
        './shared/components/forget-password/forget-password.component'
      ).then((m) => m.ForgetPasswordComponent),
  },
  {
    path: 'verification',
    loadComponent: () =>
      import('./shared/components/verification/verification.component').then(
        (m) => m.VerificationComponent,
      ),
  },
  {
    path: 'reset-password',
    loadComponent: () =>
      import(
        './shared/components/reset-password/reset-password.component'
      ).then((m) => m.ResetPasswordComponent),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./modules/home/home.routes').then((m) => m.routes),
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

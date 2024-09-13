import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { authGuard } from '../../guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,

    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'payment',
      },
      {
        path: 'payment',
        loadComponent: () =>
          import('./payment/payment.component').then((m) => m.PaymentComponent),
        canActivate: [authGuard],
      },
      {
        path: 'transfers',
        loadComponent: () =>
          import('./transfers/transfers.component').then(
            (m) => m.TransfersComponent,
          ),
        canActivate: [authGuard],
      },
      {
        path: 'history',
        loadComponent: () =>
          import('./history/history.component').then((m) => m.HistoryComponent),
        canActivate: [authGuard],
      },
      {
        path: 'chat',
        loadComponent: () =>
          import('./chat/chat.component').then((m) => m.ChatComponent),
        canActivate: [authGuard],
      },
    ],
  },
];

import { Component, DestroyRef } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../services/auth/auth.service';
import { ConfirmationService } from '../../../services/confirmation/confirmation.service';
import { switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    MatSidenavModule,
    RouterModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  constructor(
    private authService: AuthService,
    private confirmationService: ConfirmationService,
    private dr: DestroyRef,
  ) {}

  logout() {
    this.authService.logout();
  }

  deleteAccount() {
    this.confirmationService
      .opneConfirmModal('Deletion', 'Are you sure you want to delete account?')
      .pipe(
        takeUntilDestroyed(this.dr),
        switchMap(() => this.authService.deleteAccount()),
      )
      .subscribe();
  }
}

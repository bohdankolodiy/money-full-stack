import { Component, DestroyRef } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { TransactTypes } from '../../../shared/enums/transact-types.enum';
import { ITransacts } from '../../../shared/interfaces/transacts.interface';
import { ITransfer } from '../../../shared/interfaces/transfers.interface';
import { HistoryService } from '../../../services/history/history.service';
import { MatMenuModule } from '@angular/material/menu';
import { UserService } from '../../../services/user/user.service';
import { switchMap, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HistoryStatus } from '../../../shared/enums/history-status.enum';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [
    HeaderComponent,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    CommonModule,
    MatMenuModule,
  ],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss',
})
export class HistoryComponent {
  search: FormControl<string | null> = new FormControl(null);
  transacts: ITransacts[] = [];
  histroySearch: ITransfer[] = [];

  constructor(
    private historyService: HistoryService,
    private userService: UserService,
    private destroyRef: DestroyRef,
  ) {}

  ngOnInit(): void {
    this.getHistory();
  }

  getHistory() {
    this.historyService
      .getUserHistory()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => (this.transacts = res));
  }

  isReciever(item: ITransfer): boolean {
    return Boolean(
      item.action === TransactTypes.DEPOSIT ||
        item.action === TransactTypes.INCOME,
    );
  }

  getDate(item: ITransacts): string {
    const transactsDate = new Date(item.date).toDateString();
    return new Date().toDateString() === transactsDate
      ? 'Today'
      : transactsDate;
  }

  updatePaymentStatus(item: ITransfer, status: string) {
    this.userService
      .updatePaymentStatus(status, item.wallet!, item.amount, item.transact_id!)
      .pipe(
        switchMap(() => this.userService.getUser()),
        takeUntilDestroyed(this.destroyRef),
        tap(() => this.getHistory()),
      )
      .subscribe();
  }

  searchHistory() {
    this.historyService
      .searchAllHistory(this.search.getRawValue()!)
      .subscribe((res) => (this.histroySearch = res));
  }

  getMessageByStatus(status: string): string {
    switch (status) {
      case HistoryStatus.Pending:
        return '(Wait for approvement)';

      case HistoryStatus.Cancel:
        return '(Canceled)';

      case HistoryStatus.Revert:
        return '(Reverted)';

      default:
        return '';
    }
  }

  isLastTransfer(item: ITransfer): boolean {
    return this.transacts[0]?.items[0]?.id === item.id;
  }
}

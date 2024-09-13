import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnDestroy,
  OnInit,
  effect,
  inject,
  signal,
} from '@angular/core';
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
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmationModalComponent } from '../../../shared/components/modals/confirmation-modal/confirmation-modal.component';
import { filter, tap } from 'rxjs';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { TransactTypes } from '../../../shared/enums/transact-types.enum';
import { IUser } from '../../../shared/interfaces/user.interface';
import { UserService } from '../../../services/user/user.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-transfers',
  standalone: true,
  imports: [
    MatButtonToggleModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    HeaderComponent,
  ],
  templateUrl: './transfers.component.html',
  styleUrl: './transfers.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransfersComponent implements OnInit, OnDestroy {
  user!: IUser;
  private destroyRef = inject(DestroyRef);
  _dialog = inject(MatDialog);
  transferType = signal<string>(TransactTypes.DEPOSIT);
  transfersForm!: FormGroup;

  get cardNumbber(): AbstractControl {
    return this.transfersForm.get('card')!;
  }

  get amount(): AbstractControl {
    return this.transfersForm.get('amount')!;
  }

  get cardNumberError() {
    return this.cardNumbber.hasError('required')
      ? 'Field is required'
      : 'Field has to be equal 16 symbols';
  }

  get buttonText(): string {
    return this.transferType() == TransactTypes.DEPOSIT
      ? 'Send money to wallet'
      : 'Send money to card';
  }

  get isDeposit(): boolean {
    return this.transferType() === TransactTypes.DEPOSIT;
  }

  constructor(private userService: UserService) {
    effect(() => {
      this.isDeposit
        ? this.setAmountValidators()
        : this.setAmountValidators([
            Validators.required,
            this.balanceValidator(),
          ]);
    });
  }

  ngOnInit(): void {
    this.user = this.userService.getCookieUser();
    this.buildTransfersForm();
  }

  setAmountValidators(validator: ValidatorFn[] = [Validators.required]) {
    this.amount && this.amount?.setValidators(validator);
  }

  buildTransfersForm() {
    this.transfersForm = new FormGroup({
      card: new FormControl('', [
        Validators.required,
        Validators.maxLength(16),
        Validators.minLength(16),
      ]),
      amount: new FormControl('', [Validators.required]),
    });
  }

  setTransferType(event: { value: string }) {
    this.transferType.set(event.value);
  }

  async sendMoney() {
    if (this.transfersForm.invalid) return;
    const body = {
      ...this.transfersForm.getRawValue(),
    };

    if (!(await this.opneConfirmModal())) return;

    (this.isDeposit
      ? this.userService.depositMoney(body)
      : this.userService.withdrawalMoney(body)
    )
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap(() => this.transfersForm.reset()),
      )
      .subscribe(
        (res) =>
          (this.user = this.userService.updateUserBalance(
            this.user,
            res.balance,
          )),
      );
  }

  async opneConfirmModal() {
    return await this._dialog
      .open(ConfirmationModalComponent, {
        width: '250px',
        enterAnimationDuration: '500ms',
        exitAnimationDuration: '500ms',
        data: {
          title: 'Confirm transfer',
          text: 'Do you want to send your money?',
        },
      })
      .afterClosed()
      .pipe(filter((res) => res))
      .toPromise();
  }

  balanceValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>
      this.user.balance < control.value
        ? { notmatch: 'The amount must be equal or less then balance' }
        : null;
  }

  ngOnDestroy(): void {}
}

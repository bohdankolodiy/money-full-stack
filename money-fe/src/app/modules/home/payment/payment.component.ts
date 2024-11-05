import { Component, DestroyRef, OnInit, inject } from '@angular/core';
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
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { WalletPipe } from '../../../shared/pipes/wallet.pipe';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TransactionService } from '../../../services/transaction/transaction.service';
import { WalletService } from '../../../services/wallet/wallet.service';
import { IWallet } from '../../../shared/interfaces/wallet.interface';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    HeaderComponent,
    WalletPipe,
  ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss',
})
export class PaymentComponent implements OnInit {
  wallet!: IWallet;
  paymentForm!: FormGroup;
  private destroyRef = inject(DestroyRef);

  get recieverWallet(): AbstractControl {
    return this.paymentForm.get('recieverWallet')!;
  }
  get amount(): AbstractControl {
    return this.paymentForm.get('recieverWallet')!;
  }
  get comment(): AbstractControl {
    return this.paymentForm.get('recieverWallet')!;
  }

  constructor(
    private walletService: WalletService,
    private transactionService: TransactionService,
  ) {}

  ngOnInit(): void {
    this.walletService.getUserWallet().subscribe((res) => (this.wallet = res));
    this.buildPaymentForm();
  }

  buildPaymentForm() {
    this.paymentForm = new FormGroup({
      wallet: new FormControl('', [
        Validators.required,
        Validators.minLength(16),
        Validators.maxLength(16),
      ]),
      amount: new FormControl('', [
        Validators.required,
        this.balanceValidator(),
      ]),
      comment: new FormControl(''),
    });
  }

  submit() {
    if (this.paymentForm.invalid) return;

    this.transactionService
      .transactMoney(this.paymentForm.getRawValue())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.paymentForm.reset());
  }

  balanceValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>
      (this.wallet?.balance ?? 0) < control.value
        ? { notmatch: 'The amount must be equal or less then balance' }
        : null;
  }
}

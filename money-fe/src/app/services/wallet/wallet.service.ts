import { Injectable } from '@angular/core';
import {
  ITransferBody,
  ITransferResponse,
} from '../../shared/interfaces/transfers.interface';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { IWallet } from '../../shared/interfaces/wallet.interface';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  #pathUrl: string = '/api/v1/';

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
  ) {}

  getUserWallet(): Observable<IWallet> {
    return this.http.get<IWallet>(`${this.#pathUrl}wallet`);
  }

  depositMoney(body: ITransferBody): Observable<ITransferResponse> {
    return this.http
      .put<ITransferResponse>(`${this.#pathUrl}wallet/deposit`, body)
      .pipe(tap(() => this.toastr.success('Deposit was sent')));
  }

  withdrawalMoney(body: ITransferBody): Observable<ITransferResponse> {
    return this.http
      .put<ITransferResponse>(`${this.#pathUrl}wallet/withdrawal`, body)
      .pipe(tap(() => this.toastr.success('Withdrawal was sent')));
  }
}

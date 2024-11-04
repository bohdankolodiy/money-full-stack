import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ITransferResponse } from '../../shared/interfaces/transfers.interface';
import {
  ITransactsBody,
  ITransactsResponse,
} from '../../shared/interfaces/transacts.interface';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  #pathUrl: string = '/api/v1/';

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
  ) {}

  transactMoney(body: ITransactsBody): Observable<ITransactsResponse> {
    return this.http
      .put<ITransferResponse>(`${this.#pathUrl}transaction/transact`, body)
      .pipe(tap(() => this.toastr.success('Transact was sent')));
  }

  updatePaymentStatus(
    status: string,
    wallet: string,
    amount: number,
    transact_id: string,
  ): Observable<unknown> {
    return this.http
      .put<ITransferResponse>(`${this.#pathUrl}transaction/statusUpdate`, {
        status,
        wallet,
        amount,
        transact_id,
      })
      .pipe(tap(() => this.toastr.success('Status was updated')));
  }
}

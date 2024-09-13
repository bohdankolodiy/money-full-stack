import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, tap } from 'rxjs';
import { IUser } from '../../shared/interfaces/user.interface';
import {
  ITransferBody,
  ITransferResponse,
} from '../../shared/interfaces/transfers.interface';
import {
  ITransactsBody,
  ITransactsResponse,
} from '../../shared/interfaces/transacts.interface';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  #pathUrl: string = '/api/v1/';

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private toastr: ToastrService,
  ) {}

  getUser(): Observable<IUser> {
    return this.http.get<IUser>(`${this.#pathUrl}user`).pipe(
      tap((res) => {
        this.setUserCookie(res);
      }),
    );
  }

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.#pathUrl}user/all`);
  }

  setUserCookie(user: IUser) {
    this.cookieService.set('user', JSON.stringify(user));
  }

  getCookieUser(): IUser {
    const user = this.cookieService.get('user');
    return user ? JSON.parse(user) : '';
  }

  depositMoney(body: ITransferBody): Observable<ITransferResponse> {
    return this.http
      .put<ITransferResponse>(`${this.#pathUrl}user/deposit`, body)
      .pipe(tap(() => this.toastr.success('Deposit was sent')));
  }

  withdrawalMoney(body: ITransferBody): Observable<ITransferResponse> {
    return this.http
      .put<ITransferResponse>(`${this.#pathUrl}user/withdrawal`, body)
      .pipe(tap(() => this.toastr.success('Withdrawal was sent')));
  }

  transactMoney(body: ITransactsBody): Observable<ITransactsResponse> {
    return this.http
      .put<ITransferResponse>(`${this.#pathUrl}user/transact`, body)
      .pipe(tap(() => this.toastr.success('Transact was sent')));
  }

  updateUserBalance(user: IUser, balance: number) {
    user.balance = balance;
    this.setUserCookie(user);
    return user;
  }

  updatePaymentStatus(
    status: string,
    wallet: string,
    amount: number,
    transact_id: string,
  ): Observable<unknown> {
    return this.http
      .put<ITransferResponse>(`${this.#pathUrl}user/statusUpdate`, {
        status,
        wallet,
        amount,
        transact_id,
      })
      .pipe(tap(() => this.toastr.success('Status was updated')));
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';
import { ITransacts } from '../../shared/interfaces/transacts.interface';
import { ITransfer } from '../../shared/interfaces/transfers.interface';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  #pathUrl: string = '/api/v1/';

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private cookieService: CookieService,
    private toastr: ToastrService,
  ) {}

  searchAllHistory(id: string): Observable<ITransfer[]> {
    return this.http.get<ITransfer[]>(`${this.#pathUrl}history?id=${id}`);
  }

  getUserHistory(): Observable<ITransacts[]> {
    const { id } = this.userService.getCookieUser();
    return this.http.get<ITransacts[]>(`${this.#pathUrl}history/${id}`);
  }
}

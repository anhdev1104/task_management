import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAccount } from '../interface/Account';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) {}

  getAccounts(): Observable<IAccount[]> {
    return this.http.get<IAccount[]>('account');
  }

  addAccount(data: IAccount): Observable<IAccount> {
    return this.http.post<IAccount>('account', data);
  }

  loginAccount(data: IAccount): Observable<IAccount> {
    return this.http.post<IAccount>('login', data);
  }

  refreshToken(): Observable<any> {
    return this.http.get<any>('refresh');
  }

  profileAccount(): Observable<IAccount> {
    return this.http.get<IAccount>('profile');
  }
}

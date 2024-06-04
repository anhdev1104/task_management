import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAccount } from '../interface/Account';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) {}

  addAccount(data: IAccount): Observable<IAccount> {
    return this.http.post<IAccount>('/account', data);
  }
}

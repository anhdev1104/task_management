import { AccountService } from './../services/account.service';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import Cookies from 'js-cookie';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private accountService: AccountService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const accessToken = Cookies.get('accessToken'); // Lấy token từ cookie

    if (accessToken) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${accessToken}`),
      });

      return next.handle(cloned).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            return this.accountService.refreshToken().pipe(
              mergeMap((data) => {
                Cookies.set('accessToken', data.accessToken);
                const newAuthReq = req.clone({
                  headers: req.headers.set(
                    'Authorization',
                    `Bearer ${data.accessToken}`
                  ),
                });
                return next.handle(newAuthReq);
              })
            );
          }
          return throwError(error);
        })
      );
    } else {
      return next.handle(req);
    }
  }
}

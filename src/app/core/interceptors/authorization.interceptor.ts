import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import Cookies from 'js-cookie';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const accessToken = Cookies.get('accessToken'); // Lấy token từ cookie

    if (accessToken) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${accessToken}`),
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}

import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  private baseUrl: string = 'http://localhost:8080/api/v1';

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Nếu URL không bắt đầu bằng 'http', thêm baseUrl vào URL
    if (!req.url.startsWith('http')) {
      const apiReq = req.clone({ url: `${this.baseUrl}/${req.url}` });
      return next.handle(apiReq);
    }
    return next.handle(req);
  }
}

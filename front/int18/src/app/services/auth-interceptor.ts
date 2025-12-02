import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const raw = localStorage.getItem('currentUser');
    if (raw) {
      // If we had a token, we'd attach it here. For now attach a placeholder header with username.
      const user = JSON.parse(raw);
      const cloned = req.clone({ setHeaders: { 'X-User': user.username || '' } });
      return next.handle(cloned);
    }
    return next.handle(req);
  }
}

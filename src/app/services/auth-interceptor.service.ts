import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, from, switchMap } from 'rxjs';
import { AuthService } from './auth.service';
  
  @Injectable({
    providedIn: 'root',
  })
  export class AuthInterceptorService implements HttpInterceptor {
  
  constructor(private authService: AuthService) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    if (req.url === 'https://accounts.spotify.com/api/token') {
      return next.handle(req);
    }

    return from(this.authService.getAccessToken()).pipe(
      switchMap(token => {
        const cloneReq = req.clone({
          setHeaders: {
            'Content-Type': 'application/json; charset=utf-8',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
          }
        });
        return next.handle(cloneReq);
      }),
      catchError(error => {
        console.error('Error in interceptor', error);
        throw error;
      })
    );
  }
}
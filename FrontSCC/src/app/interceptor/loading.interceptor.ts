import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { finalize, catchError } from 'rxjs/operators';
import { LoaderService } from '../loader/loader.service';
import { Router } from '@angular/router';
import { LoginService } from '../services/login_services/login.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private totalRequests = 0;

  constructor(
    private loadingService: LoaderService,
    private router: Router,
    private loginService: LoginService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.totalRequests++;
    this.loadingService.setLoading(true);

    const token = localStorage.getItem('token');
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(request).pipe(
      finalize(() => {
        this.totalRequests--;
        if (this.totalRequests === 0) {
          this.loadingService.setLoading(false);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.loginService.logoutUser();
          localStorage.removeItem('flag');
          localStorage.removeItem('token');
          this.router.navigate(['']);
        }
        return throwError(error);
      })
    );
  }
}

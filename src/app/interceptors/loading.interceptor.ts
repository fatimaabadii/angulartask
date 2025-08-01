import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private loadingService: LoadingService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.show();

    return next.handle(req).pipe(
      tap({
        next: (event) => {
          if (event instanceof HttpResponse) {
            this.loadingService.hide();
          }
        },
        error: (error) => {
          if (error instanceof HttpErrorResponse) {
            this.loadingService.hide();
          }
        }
      })
    );
  }
}

import { Injectable } from '@angular/core';
import { LoggerService } from '../../services/logger/logger.service';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { LogData } from '../../interfaces/log-data.interface';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorInterceptorService {
  constructor(private logger: LoggerService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        const logData: LogData = {
          message: `HTTP Error: ${error.status} - ${error.statusText}`,
          stackTrace:
            error.error instanceof Error ? error.error.stack : error.error,
          timestamp: new Date().toISOString(),
        };
        this.logger.logError(logData);

        return throwError(() => error);
      })
    );
  }
}

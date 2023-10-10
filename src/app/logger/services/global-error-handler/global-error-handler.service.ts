import { Injectable } from '@angular/core';
import { LoggerService } from '../logger/logger.service';
import { LogData } from '../../interfaces/log-data.interface';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandlerService {
  constructor(private logger: LoggerService) {}

  handleError(error: any): void {
    const stackTrace = error.stack || new Error().stack || 'Empty stack';

    const logData: LogData = {
      message: error.message || 'An error occurred',
      stackTrace: stackTrace,
      timestamp: new Date().toISOString(),
    };

    this.logger.logError(logData);
  }
}

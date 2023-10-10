import { DOCUMENT } from '@angular/common';
import {
  Inject,
  Injectable,
  InjectionToken,
  Injector,
  OnDestroy,
  isDevMode,
} from '@angular/core';
import { BehaviorSubject, Subject, bufferTime, filter, interval } from 'rxjs';
import {
  DEFAULT_INTERVAL_MS,
  DEFAULT_MESSAGE_FORMAT,
  DEFAULT_TARGETS,
} from '../../consts';
import { LogData } from '../../interfaces/log-data.interface';
import { LoggerConfig } from '../../interfaces/logger-config.interface';
import { LOGGER_CONFIG_TOKEN } from '../../tokens';
import { environment } from 'src/app/environment';

@Injectable({
  providedIn: 'root',
})
export class LoggerService implements OnDestroy {
  private logQueue$$: BehaviorSubject<LogData[]> = new BehaviorSubject<
    LogData[]
  >([]);
  private destroyed$ = new Subject<void>();

  constructor(
    @Inject(LOGGER_CONFIG_TOKEN)
    private readonly config: LoggerConfig,
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly injector: Injector
  ) {
    if (environment.production && config.useQueue && document.defaultView) {
      const intervalTimeMs = config.flushInterval || DEFAULT_INTERVAL_MS;

      interval(intervalTimeMs)
        .pipe(
          filter(() => this.logQueue$$.value.length > 0),
          bufferTime(intervalTimeMs)
        )
        .subscribe(() => this.flushLogQueue());
    }
  }

  public logError(error: LogData): void {
    if (!environment.production) {
      return;
    }

    const logData: LogData = {
      message: this.formatMessage(error.message),
      stackTrace: error.stackTrace,
      timestamp: new Date().toISOString(),
    };

    if (this.config.useQueue) {
      const currentQueue = this.logQueue$$.value;
      currentQueue.push(logData);
      this.logQueue$$.next(currentQueue);
    } else {
      this.writeLog(logData);
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  private writeLog(logData: LogData): void {
    const targetsArray = this.config.targets || DEFAULT_TARGETS;
    for (const target of targetsArray) {
      console.log(target);
      if (target === 'console') {

        console.error(logData);
      } else if (target === 'localStorage') {
        const key = `Error queue: ${logData.timestamp}`;
        this.document.defaultView?.localStorage.setItem(
          key,
          JSON.stringify(logData)
        );
      } else if (target instanceof InjectionToken) {
        const targetInstance = this.injector.get(target, null, {
          optional: true,
        });
        if (targetInstance) {
          targetInstance.write(JSON.stringify(logData));
        }
      }
    }
  }

  private formatMessage(message: string): string {
    const format = this.config.messageFormat || DEFAULT_MESSAGE_FORMAT;
    return format.replace('{message}', message);
  }

  private flushLogQueue(): void {
    const currentQueue = this.logQueue$$.value;
    this.logQueue$$.next([]);

    for (const logData of currentQueue) {
      this.writeLog(logData);
    }
  }
}

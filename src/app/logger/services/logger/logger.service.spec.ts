import { TestBed } from '@angular/core/testing';

import { DOCUMENT } from '@angular/common';
import { Injector } from '@angular/core';
import { environment } from 'src/app/environment';
import { MOCK_CONFIG } from '../../consts';
import { LOGGER_CONFIG_TOKEN } from '../../tokens';
import { LoggerService } from './logger.service';
import { LogData } from '../../interfaces/log-data.interface';

describe('LoggerService', () => {
  let loggerService: LoggerService;

  beforeEach(() => {
    environment.production = true;

    TestBed.configureTestingModule({
      providers: [
        LoggerService,
        {
          provide: LOGGER_CONFIG_TOKEN,
          useValue: MOCK_CONFIG,
        },
        {
          provide: DOCUMENT,
          useValue: document,
        },
        Injector,
      ],
    });

    loggerService = TestBed.inject(LoggerService);
  });

  it('should be created', () => {
    expect(loggerService).toBeTruthy();
  });

  it('should not log errors in dev mode', () => {
    environment.production = false;

    spyOn(console, 'error');

    expect(environment.production).toBe(false);

    const errorData: LogData = {
      message: 'Test error',
      stackTrace: 'Test stack trace',
      timestamp: new Date().toISOString(),
    };

    loggerService.logError(errorData);

    expect(console.error).not.toHaveBeenCalled();
  });

  it('should write logs to console and localStorage instantly', () => {
    spyOn(console, 'error');

    if (loggerService['document'].defaultView) {
      spyOn(loggerService['document'].defaultView.localStorage, 'setItem');
    }

    const errorData = {
      message: 'Test error',
      stackTrace: 'Test stack trace',
      timestamp: new Date().toISOString(),
    };

    loggerService['writeLog'](errorData);

    expect(console.error).toHaveBeenCalledWith(errorData);

    if (loggerService['document'].defaultView) {
      const key = `Error queue: ${errorData.timestamp}`;
      expect(
        loggerService['document'].defaultView.localStorage.setItem
      ).toHaveBeenCalledWith(key, JSON.stringify(errorData));
    }
  });

  it('should write logs to console and localStorage with flush delay', (done: DoneFn) => {
    environment.production = true;

    spyOn(console, 'error');

    if (loggerService['document'].defaultView) {
      spyOn(loggerService['document'].defaultView.localStorage, 'setItem');
    }

    const errorData = {
      message: 'Test error',
      stackTrace: 'Test stack trace',
      timestamp: new Date().toISOString(),
    };

    loggerService.logError(errorData);

    setTimeout(() => {
      expect(console.error).toHaveBeenCalledWith(errorData);

      if (loggerService['document'].defaultView) {
        const key = `Error queue: ${errorData.timestamp}`;
        expect(
          loggerService['document'].defaultView.localStorage.setItem
        ).toHaveBeenCalledWith(key, JSON.stringify(errorData));
      }
      done();
    }, MOCK_CONFIG.flushInterval + 300);
  });
});

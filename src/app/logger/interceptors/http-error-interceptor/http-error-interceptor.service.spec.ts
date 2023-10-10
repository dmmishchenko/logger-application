import { TestBed } from '@angular/core/testing';

import { HttpErrorInterceptorService } from './http-error-interceptor.service';
import { MOCK_CONFIG } from '../../consts';
import { LOGGER_CONFIG_TOKEN } from '../../tokens';

describe('HttpErrorInterceptorService', () => {
  let service: HttpErrorInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: LOGGER_CONFIG_TOKEN,
          useValue: MOCK_CONFIG,
        },
      ],
    });
    service = TestBed.inject(HttpErrorInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

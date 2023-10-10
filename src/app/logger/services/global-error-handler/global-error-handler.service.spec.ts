import { TestBed } from '@angular/core/testing';

import { GlobalErrorHandlerService } from './global-error-handler.service';
import { MOCK_CONFIG } from '../../consts';
import { LOGGER_CONFIG_TOKEN } from '../../tokens';

describe('GlobalErrorHandlerService', () => {
  let service: GlobalErrorHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: LOGGER_CONFIG_TOKEN,
          useValue: MOCK_CONFIG,
        },
      ],
    });
    service = TestBed.inject(GlobalErrorHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

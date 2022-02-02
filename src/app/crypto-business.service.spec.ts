import { TestBed } from '@angular/core/testing';

import { CryptoBusinessService } from './crypto-business.service';

describe('CryptoBusinessService', () => {
  let service: CryptoBusinessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CryptoBusinessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

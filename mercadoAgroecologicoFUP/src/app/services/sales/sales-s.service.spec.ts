import { TestBed } from '@angular/core/testing';

import { SalesSService } from './sales-s.service';

describe('SalesSService', () => {
  let service: SalesSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalesSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

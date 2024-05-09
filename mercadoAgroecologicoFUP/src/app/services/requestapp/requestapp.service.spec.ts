import { TestBed } from '@angular/core/testing';

import { RequestappService } from './requestapp.service';

describe('RequestappService', () => {
  let service: RequestappService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestappService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

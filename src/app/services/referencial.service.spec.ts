import { TestBed } from '@angular/core/testing';

import { ReferentialService } from './referential.service';

describe('ReferencialService', () => {
  let service: ReferentialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReferentialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

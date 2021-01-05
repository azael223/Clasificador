import { TestBed } from '@angular/core/testing';

import { ClasificationService } from './clasification.service';

describe('ClasificationService', () => {
  let service: ClasificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClasificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

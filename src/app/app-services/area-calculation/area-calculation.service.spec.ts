import { TestBed, inject } from '@angular/core/testing';

import { AreaCalculationService } from './area-calculation.service';

describe('AreaCalculationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AreaCalculationService]
    });
  });

  it('should be created', inject([AreaCalculationService], (service: AreaCalculationService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed } from '@angular/core/testing';

import { EtudientService } from './etudient.service';

describe('EtudientService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EtudientService = TestBed.get(EtudientService);
    expect(service).toBeTruthy();
  });
});

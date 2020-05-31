import { TestBed } from '@angular/core/testing';

import { EnseignantGuardService } from './enseignant-guard.service';

describe('EnseignantGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnseignantGuardService = TestBed.get(EnseignantGuardService);
    expect(service).toBeTruthy();
  });
});

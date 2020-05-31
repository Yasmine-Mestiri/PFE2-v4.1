import { TestBed } from '@angular/core/testing';

import { EtudiantGuardService } from './etudiant-guard.service';

describe('EtudiantGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EtudiantGuardService = TestBed.get(EtudiantGuardService);
    expect(service).toBeTruthy();
  });
});

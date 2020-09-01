import { TestBed } from '@angular/core/testing';

import { HelloDoctorService } from './hello-doctor.service';

describe('HelloDoctorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HelloDoctorService = TestBed.get(HelloDoctorService);
    expect(service).toBeTruthy();
  });
});

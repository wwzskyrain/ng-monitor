import { TestBed } from '@angular/core/testing';

import { OpsService } from './ops.service';

describe('OpsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OpsService = TestBed.get(OpsService);
    expect(service).toBeTruthy();
  });
});

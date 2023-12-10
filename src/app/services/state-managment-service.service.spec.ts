import { TestBed } from '@angular/core/testing';

import { StateManagmentServiceService } from './state-managment-service.service';

describe('StateManagmentServiceService', () => {
  let service: StateManagmentServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateManagmentServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

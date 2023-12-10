import { TestBed } from '@angular/core/testing';

import { CrudSerivceService } from './crud-serivce.service';

describe('CrudSerivceService', () => {
  let service: CrudSerivceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudSerivceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

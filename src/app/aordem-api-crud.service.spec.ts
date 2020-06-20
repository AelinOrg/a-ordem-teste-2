import { TestBed } from '@angular/core/testing';

import { AordemApiCrudService } from './aordem-api-crud.service';

describe('AordemApiCrudService', () => {
  let service: AordemApiCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AordemApiCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

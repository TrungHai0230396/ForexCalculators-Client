import { TestBed } from '@angular/core/testing';

import { OrderInfoService } from './orderInfo.service';

describe('OrderInfoService', () => {
  let service: OrderInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

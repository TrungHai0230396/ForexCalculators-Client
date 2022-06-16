import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderInfoComponent } from './orderInfo.component';

describe('orderInfoComponent', () => {
  let component: OrderInfoComponent;
  let fixture: ComponentFixture<OrderInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

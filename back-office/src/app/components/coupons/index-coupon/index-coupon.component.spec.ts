import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexCouponComponent } from './index-coupon.component';

describe('IndexCouponComponent', () => {
  let component: IndexCouponComponent;
  let fixture: ComponentFixture<IndexCouponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexCouponComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexCouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

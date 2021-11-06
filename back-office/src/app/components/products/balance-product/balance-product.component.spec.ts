import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceProductComponent } from './balance-product.component';

describe('BalanceProductComponent', () => {
  let component: BalanceProductComponent;
  let fixture: ComponentFixture<BalanceProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BalanceProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

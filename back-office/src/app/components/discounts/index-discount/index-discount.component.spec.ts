import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexDiscountComponent } from './index-discount.component';

describe('IndexDiscountComponent', () => {
  let component: IndexDiscountComponent;
  let fixture: ComponentFixture<IndexDiscountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexDiscountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

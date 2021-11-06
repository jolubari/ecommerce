import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsProductComponent } from './reviews-product.component';

describe('ReviewsProductComponent', () => {
  let component: ReviewsProductComponent;
  let fixture: ComponentFixture<ReviewsProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewsProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewsProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

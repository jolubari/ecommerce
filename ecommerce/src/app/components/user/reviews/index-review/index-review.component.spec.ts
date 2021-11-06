import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexReviewComponent } from './index-review.component';

describe('IndexReviewComponent', () => {
  let component: IndexReviewComponent;
  let fixture: ComponentFixture<IndexReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

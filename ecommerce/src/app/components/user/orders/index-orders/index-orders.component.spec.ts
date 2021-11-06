import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexOrdersComponent } from './index-orders.component';

describe('IndexOrdersComponent', () => {
  let component: IndexOrdersComponent;
  let fixture: ComponentFixture<IndexOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

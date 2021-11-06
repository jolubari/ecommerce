import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexSaleComponent } from './index-sale.component';

describe('IndexSaleComponent', () => {
  let component: IndexSaleComponent;
  let fixture: ComponentFixture<IndexSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexSaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

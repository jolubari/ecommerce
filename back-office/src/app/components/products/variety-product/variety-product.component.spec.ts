import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VarietyProductComponent } from './variety-product.component';

describe('VarietyProductComponent', () => {
  let component: VarietyProductComponent;
  let fixture: ComponentFixture<VarietyProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VarietyProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VarietyProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

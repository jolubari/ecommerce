import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryProductComponent } from './gallery-product.component';

describe('GalleryProductComponent', () => {
  let component: GalleryProductComponent;
  let fixture: ComponentFixture<GalleryProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalleryProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexClientComponent } from './index-client.component';

describe('IndexClientComponent', () => {
  let component: IndexClientComponent;
  let fixture: ComponentFixture<IndexClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

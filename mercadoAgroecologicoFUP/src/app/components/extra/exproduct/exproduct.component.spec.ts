import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExproductComponent } from './exproduct.component';

describe('ExproductComponent', () => {
  let component: ExproductComponent;
  let fixture: ComponentFixture<ExproductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExproductComponent]
    });
    fixture = TestBed.createComponent(ExproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductOWNComponent } from './product-own.component';

describe('ProductOWNComponent', () => {
  let component: ProductOWNComponent;
  let fixture: ComponentFixture<ProductOWNComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductOWNComponent]
    });
    fixture = TestBed.createComponent(ProductOWNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductOffComponent } from './product-off.component';

describe('ProductOffComponent', () => {
  let component: ProductOffComponent;
  let fixture: ComponentFixture<ProductOffComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductOffComponent]
    });
    fixture = TestBed.createComponent(ProductOffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSHOWComponent } from './product-show.component';

describe('ProductSHOWComponent', () => {
  let component: ProductSHOWComponent;
  let fixture: ComponentFixture<ProductSHOWComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductSHOWComponent]
    });
    fixture = TestBed.createComponent(ProductSHOWComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

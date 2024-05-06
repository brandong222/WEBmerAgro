import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductADDComponent } from './product-add.component';

describe('ProductADDComponent', () => {
  let component: ProductADDComponent;
  let fixture: ComponentFixture<ProductADDComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductADDComponent]
    });
    fixture = TestBed.createComponent(ProductADDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

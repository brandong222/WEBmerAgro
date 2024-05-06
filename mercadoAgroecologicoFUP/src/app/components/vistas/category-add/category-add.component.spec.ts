import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryADDComponent } from './category-add.component';

describe('CategoryADDComponent', () => {
  let component: CategoryADDComponent;
  let fixture: ComponentFixture<CategoryADDComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryADDComponent]
    });
    fixture = TestBed.createComponent(CategoryADDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

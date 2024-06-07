import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetPASSWORDComponent } from './forget-password.component';

describe('ForgetPASSWORDComponent', () => {
  let component: ForgetPASSWORDComponent;
  let fixture: ComponentFixture<ForgetPASSWORDComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForgetPASSWORDComponent]
    });
    fixture = TestBed.createComponent(ForgetPASSWORDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

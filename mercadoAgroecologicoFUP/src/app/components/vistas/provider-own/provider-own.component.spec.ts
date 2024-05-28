import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderOWNComponent } from './provider-own.component';

describe('ProviderOWNComponent', () => {
  let component: ProviderOWNComponent;
  let fixture: ComponentFixture<ProviderOWNComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProviderOWNComponent]
    });
    fixture = TestBed.createComponent(ProviderOWNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

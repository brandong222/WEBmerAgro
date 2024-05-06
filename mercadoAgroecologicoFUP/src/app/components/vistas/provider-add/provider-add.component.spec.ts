import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderADDComponent } from './provider-add.component';

describe('ProviderADDComponent', () => {
  let component: ProviderADDComponent;
  let fixture: ComponentFixture<ProviderADDComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProviderADDComponent]
    });
    fixture = TestBed.createComponent(ProviderADDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

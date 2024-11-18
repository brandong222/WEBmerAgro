import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExheaderComponent } from './exheader.component';

describe('ExheaderComponent', () => {
  let component: ExheaderComponent;
  let fixture: ComponentFixture<ExheaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExheaderComponent]
    });
    fixture = TestBed.createComponent(ExheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

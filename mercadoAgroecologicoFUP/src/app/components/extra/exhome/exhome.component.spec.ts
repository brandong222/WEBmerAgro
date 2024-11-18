import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExhomeComponent } from './exhome.component';

describe('ExhomeComponent', () => {
  let component: ExhomeComponent;
  let fixture: ComponentFixture<ExhomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExhomeComponent]
    });
    fixture = TestBed.createComponent(ExhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

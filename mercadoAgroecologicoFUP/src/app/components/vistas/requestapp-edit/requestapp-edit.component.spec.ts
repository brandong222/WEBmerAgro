import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestappEDITComponent } from './requestapp-edit.component';

describe('RequestappEDITComponent', () => {
  let component: RequestappEDITComponent;
  let fixture: ComponentFixture<RequestappEDITComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestappEDITComponent]
    });
    fixture = TestBed.createComponent(RequestappEDITComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

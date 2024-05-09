import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestappADDComponent } from './requestapp-add.component';

describe('RequestappADDComponent', () => {
  let component: RequestappADDComponent;
  let fixture: ComponentFixture<RequestappADDComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestappADDComponent]
    });
    fixture = TestBed.createComponent(RequestappADDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

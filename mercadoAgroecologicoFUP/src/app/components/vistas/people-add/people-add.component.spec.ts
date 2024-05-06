import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleADDComponent } from './people-add.component';

describe('PeopleADDComponent', () => {
  let component: PeopleADDComponent;
  let fixture: ComponentFixture<PeopleADDComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PeopleADDComponent]
    });
    fixture = TestBed.createComponent(PeopleADDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

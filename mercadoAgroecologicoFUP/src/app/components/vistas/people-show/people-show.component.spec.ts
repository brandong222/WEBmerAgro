import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleSHOWComponent } from './people-show.component';

describe('PeopleSHOWComponent', () => {
  let component: PeopleSHOWComponent;
  let fixture: ComponentFixture<PeopleSHOWComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PeopleSHOWComponent]
    });
    fixture = TestBed.createComponent(PeopleSHOWComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

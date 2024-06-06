import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLISTComponent } from './user-list.component';

describe('UserLISTComponent', () => {
  let component: UserLISTComponent;
  let fixture: ComponentFixture<UserLISTComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserLISTComponent]
    });
    fixture = TestBed.createComponent(UserLISTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

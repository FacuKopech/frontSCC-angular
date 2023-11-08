import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRolesPopupComponent } from './user-roles-popup.component';

describe('UserRolesPopupComponent', () => {
  let component: UserRolesPopupComponent;
  let fixture: ComponentFixture<UserRolesPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserRolesPopupComponent]
    });
    fixture = TestBed.createComponent(UserRolesPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

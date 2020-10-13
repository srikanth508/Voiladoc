import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRoleMappingdashComponent } from './user-role-mappingdash.component';

describe('UserRoleMappingdashComponent', () => {
  let component: UserRoleMappingdashComponent;
  let fixture: ComponentFixture<UserRoleMappingdashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRoleMappingdashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRoleMappingdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

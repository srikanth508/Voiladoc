import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDoctorRegistrationComponent } from './edit-doctor-registration.component';

describe('EditDoctorRegistrationComponent', () => {
  let component: EditDoctorRegistrationComponent;
  let fixture: ComponentFixture<EditDoctorRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDoctorRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDoctorRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

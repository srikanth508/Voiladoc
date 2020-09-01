import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalDoctorRegistrationComponent } from './local-doctor-registration.component';

describe('LocalDoctorRegistrationComponent', () => {
  let component: LocalDoctorRegistrationComponent;
  let fixture: ComponentFixture<LocalDoctorRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalDoctorRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalDoctorRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

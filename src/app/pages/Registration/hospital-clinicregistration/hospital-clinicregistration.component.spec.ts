import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalClinicregistrationComponent } from './hospital-clinicregistration.component';

describe('HospitalClinicregistrationComponent', () => {
  let component: HospitalClinicregistrationComponent;
  let fixture: ComponentFixture<HospitalClinicregistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalClinicregistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalClinicregistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

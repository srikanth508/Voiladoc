import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHospitalClinicComponent } from './edit-hospital-clinic.component';

describe('EditHospitalClinicComponent', () => {
  let component: EditHospitalClinicComponent;
  let fixture: ComponentFixture<EditHospitalClinicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditHospitalClinicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditHospitalClinicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

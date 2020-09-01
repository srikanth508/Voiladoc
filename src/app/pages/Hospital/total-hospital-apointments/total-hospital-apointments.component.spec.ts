import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalHospitalApointmentsComponent } from './total-hospital-apointments.component';

describe('TotalHospitalApointmentsComponent', () => {
  let component: TotalHospitalApointmentsComponent;
  let fixture: ComponentFixture<TotalHospitalApointmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalHospitalApointmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalHospitalApointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientInviteReportComponent } from './patient-invite-report.component';

describe('PatientInviteReportComponent', () => {
  let component: PatientInviteReportComponent;
  let fixture: ComponentFixture<PatientInviteReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientInviteReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientInviteReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

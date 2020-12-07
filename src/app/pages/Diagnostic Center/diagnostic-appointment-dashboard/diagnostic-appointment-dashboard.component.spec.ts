import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticAppointmentDashboardComponent } from './diagnostic-appointment-dashboard.component';

describe('DiagnosticAppointmentDashboardComponent', () => {
  let component: DiagnosticAppointmentDashboardComponent;
  let fixture: ComponentFixture<DiagnosticAppointmentDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagnosticAppointmentDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticAppointmentDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

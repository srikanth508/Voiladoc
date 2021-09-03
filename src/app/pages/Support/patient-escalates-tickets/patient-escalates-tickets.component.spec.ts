import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientEscalatesTicketsComponent } from './patient-escalates-tickets.component';

describe('PatientEscalatesTicketsComponent', () => {
  let component: PatientEscalatesTicketsComponent;
  let fixture: ComponentFixture<PatientEscalatesTicketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientEscalatesTicketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientEscalatesTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

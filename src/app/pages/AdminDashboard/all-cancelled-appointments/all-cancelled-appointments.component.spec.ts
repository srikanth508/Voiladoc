import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCancelledAppointmentsComponent } from './all-cancelled-appointments.component';

describe('AllCancelledAppointmentsComponent', () => {
  let component: AllCancelledAppointmentsComponent;
  let fixture: ComponentFixture<AllCancelledAppointmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllCancelledAppointmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCancelledAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

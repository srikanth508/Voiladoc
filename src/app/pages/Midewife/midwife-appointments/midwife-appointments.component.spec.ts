import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MidwifeAppointmentsComponent } from './midwife-appointments.component';

describe('MidwifeAppointmentsComponent', () => {
  let component: MidwifeAppointmentsComponent;
  let fixture: ComponentFixture<MidwifeAppointmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MidwifeAppointmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MidwifeAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

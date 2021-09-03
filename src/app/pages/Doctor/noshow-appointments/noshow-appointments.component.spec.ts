import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoshowAppointmentsComponent } from './noshow-appointments.component';

describe('NoshowAppointmentsComponent', () => {
  let component: NoshowAppointmentsComponent;
  let fixture: ComponentFixture<NoshowAppointmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoshowAppointmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoshowAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

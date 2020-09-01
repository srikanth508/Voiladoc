import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAllAppointmentsComponent } from './admin-all-appointments.component';

describe('AdminAllAppointmentsComponent', () => {
  let component: AdminAllAppointmentsComponent;
  let fixture: ComponentFixture<AdminAllAppointmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAllAppointmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAllAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

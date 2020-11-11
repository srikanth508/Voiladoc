import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCareAppointmentsComponent } from './home-care-appointments.component';

describe('HomeCareAppointmentsComponent', () => {
  let component: HomeCareAppointmentsComponent;
  let fixture: ComponentFixture<HomeCareAppointmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeCareAppointmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCareAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

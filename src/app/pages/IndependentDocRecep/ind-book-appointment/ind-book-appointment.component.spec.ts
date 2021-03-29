import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndBookAppointmentComponent } from './ind-book-appointment.component';

describe('IndBookAppointmentComponent', () => {
  let component: IndBookAppointmentComponent;
  let fixture: ComponentFixture<IndBookAppointmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndBookAppointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndBookAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

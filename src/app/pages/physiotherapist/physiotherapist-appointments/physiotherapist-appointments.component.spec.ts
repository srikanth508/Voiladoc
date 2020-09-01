import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysiotherapistAppointmentsComponent } from './physiotherapist-appointments.component';

describe('PhysiotherapistAppointmentsComponent', () => {
  let component: PhysiotherapistAppointmentsComponent;
  let fixture: ComponentFixture<PhysiotherapistAppointmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhysiotherapistAppointmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysiotherapistAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

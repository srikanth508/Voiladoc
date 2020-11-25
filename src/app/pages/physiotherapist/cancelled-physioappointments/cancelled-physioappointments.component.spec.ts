import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelledPhysioappointmentsComponent } from './cancelled-physioappointments.component';

describe('CancelledPhysioappointmentsComponent', () => {
  let component: CancelledPhysioappointmentsComponent;
  let fixture: ComponentFixture<CancelledPhysioappointmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelledPhysioappointmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelledPhysioappointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

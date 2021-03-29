import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocRecpAppointmentsComponent } from './doc-recp-appointments.component';

describe('DocRecpAppointmentsComponent', () => {
  let component: DocRecpAppointmentsComponent;
  let fixture: ComponentFixture<DocRecpAppointmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocRecpAppointmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocRecpAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

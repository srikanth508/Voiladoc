import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalCompletedTicketsComponent } from './hospital-completed-tickets.component';

describe('HospitalCompletedTicketsComponent', () => {
  let component: HospitalCompletedTicketsComponent;
  let fixture: ComponentFixture<HospitalCompletedTicketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalCompletedTicketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalCompletedTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientInvitesDashComponent } from './patient-invites-dash.component';

describe('PatientInvitesDashComponent', () => {
  let component: PatientInvitesDashComponent;
  let fixture: ComponentFixture<PatientInvitesDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientInvitesDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientInvitesDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

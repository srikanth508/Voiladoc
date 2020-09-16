import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalSupportDashComponent } from './hospital-support-dash.component';

describe('HospitalSupportDashComponent', () => {
  let component: HospitalSupportDashComponent;
  let fixture: ComponentFixture<HospitalSupportDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalSupportDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalSupportDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

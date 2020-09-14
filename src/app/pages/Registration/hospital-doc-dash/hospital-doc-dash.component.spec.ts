import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalDocDashComponent } from './hospital-doc-dash.component';

describe('HospitalDocDashComponent', () => {
  let component: HospitalDocDashComponent;
  let fixture: ComponentFixture<HospitalDocDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalDocDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalDocDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

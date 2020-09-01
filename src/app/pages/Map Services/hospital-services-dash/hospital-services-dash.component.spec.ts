import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalServicesDashComponent } from './hospital-services-dash.component';

describe('HospitalServicesDashComponent', () => {
  let component: HospitalServicesDashComponent;
  let fixture: ComponentFixture<HospitalServicesDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalServicesDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalServicesDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

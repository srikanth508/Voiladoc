import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorServicesDashComponent } from './doctor-services-dash.component';

describe('DoctorServicesDashComponent', () => {
  let component: DoctorServicesDashComponent;
  let fixture: ComponentFixture<DoctorServicesDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorServicesDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorServicesDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

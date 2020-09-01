import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorRevenueDashboardComponent } from './doctor-revenue-dashboard.component';

describe('DoctorRevenueDashboardComponent', () => {
  let component: DoctorRevenueDashboardComponent;
  let fixture: ComponentFixture<DoctorRevenueDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorRevenueDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorRevenueDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorRevenueComponent } from './doctor-revenue.component';

describe('DoctorRevenueComponent', () => {
  let component: DoctorRevenueComponent;
  let fixture: ComponentFixture<DoctorRevenueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorRevenueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorRevenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

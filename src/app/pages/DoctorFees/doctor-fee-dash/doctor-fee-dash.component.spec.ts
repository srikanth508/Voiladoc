import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorFeeDashComponent } from './doctor-fee-dash.component';

describe('DoctorFeeDashComponent', () => {
  let component: DoctorFeeDashComponent;
  let fixture: ComponentFixture<DoctorFeeDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorFeeDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorFeeDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

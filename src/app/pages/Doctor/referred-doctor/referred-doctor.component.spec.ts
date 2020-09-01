import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferredDoctorComponent } from './referred-doctor.component';

describe('ReferredDoctorComponent', () => {
  let component: ReferredDoctorComponent;
  let fixture: ComponentFixture<ReferredDoctorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferredDoctorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferredDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

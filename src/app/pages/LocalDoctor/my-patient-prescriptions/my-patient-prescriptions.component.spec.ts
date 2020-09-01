import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPatientPrescriptionsComponent } from './my-patient-prescriptions.component';

describe('MyPatientPrescriptionsComponent', () => {
  let component: MyPatientPrescriptionsComponent;
  let fixture: ComponentFixture<MyPatientPrescriptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyPatientPrescriptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPatientPrescriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

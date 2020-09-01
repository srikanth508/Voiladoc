import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalPatientHistoryComponent } from './medical-patient-history.component';

describe('MedicalPatientHistoryComponent', () => {
  let component: MedicalPatientHistoryComponent;
  let fixture: ComponentFixture<MedicalPatientHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalPatientHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalPatientHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

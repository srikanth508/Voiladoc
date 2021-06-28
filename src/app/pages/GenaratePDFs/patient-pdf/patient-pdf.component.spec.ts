import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientPdfComponent } from './patient-pdf.component';

describe('PatientPdfComponent', () => {
  let component: PatientPdfComponent;
  let fixture: ComponentFixture<PatientPdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientPdfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

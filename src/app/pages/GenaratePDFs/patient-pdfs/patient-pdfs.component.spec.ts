import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientPdfsComponent } from './patient-pdfs.component';

describe('PatientPdfsComponent', () => {
  let component: PatientPdfsComponent;
  let fixture: ComponentFixture<PatientPdfsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientPdfsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientPdfsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

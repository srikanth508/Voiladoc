import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MergePatientdataComponent } from './merge-patientdata.component';

describe('MergePatientdataComponent', () => {
  let component: MergePatientdataComponent;
  let fixture: ComponentFixture<MergePatientdataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MergePatientdataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MergePatientdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

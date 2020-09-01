import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescriptionReportsComponent } from './prescription-reports.component';

describe('PrescriptionReportsComponent', () => {
  let component: PrescriptionReportsComponent;
  let fixture: ComponentFixture<PrescriptionReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrescriptionReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrescriptionReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

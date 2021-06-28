import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyChargesReportComponent } from './pharmacy-charges-report.component';

describe('PharmacyChargesReportComponent', () => {
  let component: PharmacyChargesReportComponent;
  let fixture: ComponentFixture<PharmacyChargesReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PharmacyChargesReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacyChargesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

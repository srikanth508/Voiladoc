import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaChargesReportComponent } from './dia-charges-report.component';

describe('DiaChargesReportComponent', () => {
  let component: DiaChargesReportComponent;
  let fixture: ComponentFixture<DiaChargesReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiaChargesReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiaChargesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

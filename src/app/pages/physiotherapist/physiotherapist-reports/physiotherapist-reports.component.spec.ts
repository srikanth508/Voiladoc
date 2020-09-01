import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysiotherapistReportsComponent } from './physiotherapist-reports.component';

describe('PhysiotherapistReportsComponent', () => {
  let component: PhysiotherapistReportsComponent;
  let fixture: ComponentFixture<PhysiotherapistReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhysiotherapistReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysiotherapistReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysioDashboardDetailsComponent } from './physio-dashboard-details.component';

describe('PhysioDashboardDetailsComponent', () => {
  let component: PhysioDashboardDetailsComponent;
  let fixture: ComponentFixture<PhysioDashboardDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhysioDashboardDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysioDashboardDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

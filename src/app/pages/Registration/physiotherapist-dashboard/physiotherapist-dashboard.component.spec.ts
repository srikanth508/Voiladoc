import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysiotherapistDashboardComponent } from './physiotherapist-dashboard.component';

describe('PhysiotherapistDashboardComponent', () => {
  let component: PhysiotherapistDashboardComponent;
  let fixture: ComponentFixture<PhysiotherapistDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhysiotherapistDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysiotherapistDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

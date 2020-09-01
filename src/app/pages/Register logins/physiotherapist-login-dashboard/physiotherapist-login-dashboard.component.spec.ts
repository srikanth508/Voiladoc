import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysiotherapistLoginDashboardComponent } from './physiotherapist-login-dashboard.component';

describe('PhysiotherapistLoginDashboardComponent', () => {
  let component: PhysiotherapistLoginDashboardComponent;
  let fixture: ComponentFixture<PhysiotherapistLoginDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhysiotherapistLoginDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysiotherapistLoginDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryCompanyLoginDashboardComponent } from './delivery-company-login-dashboard.component';

describe('DeliveryCompanyLoginDashboardComponent', () => {
  let component: DeliveryCompanyLoginDashboardComponent;
  let fixture: ComponentFixture<DeliveryCompanyLoginDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryCompanyLoginDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryCompanyLoginDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

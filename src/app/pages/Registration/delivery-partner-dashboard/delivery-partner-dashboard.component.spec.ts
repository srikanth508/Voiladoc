import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryPartnerDashboardComponent } from './delivery-partner-dashboard.component';

describe('DeliveryPartnerDashboardComponent', () => {
  let component: DeliveryPartnerDashboardComponent;
  let fixture: ComponentFixture<DeliveryPartnerDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryPartnerDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryPartnerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

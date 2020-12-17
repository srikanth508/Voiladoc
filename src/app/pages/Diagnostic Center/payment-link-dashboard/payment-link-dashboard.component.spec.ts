import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentLinkDashboardComponent } from './payment-link-dashboard.component';

describe('PaymentLinkDashboardComponent', () => {
  let component: PaymentLinkDashboardComponent;
  let fixture: ComponentFixture<PaymentLinkDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentLinkDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentLinkDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

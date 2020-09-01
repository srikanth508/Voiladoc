import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryCompanyLoginComponent } from './delivery-company-login.component';

describe('DeliveryCompanyLoginComponent', () => {
  let component: DeliveryCompanyLoginComponent;
  let fixture: ComponentFixture<DeliveryCompanyLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryCompanyLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryCompanyLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProviderPaymentsComponent } from './all-provider-payments.component';

describe('AllProviderPaymentsComponent', () => {
  let component: AllProviderPaymentsComponent;
  let fixture: ComponentFixture<AllProviderPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllProviderPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllProviderPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

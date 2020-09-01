import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SickSlipDashboardComponent } from './sick-slip-dashboard.component';

describe('SickSlipDashboardComponent', () => {
  let component: SickSlipDashboardComponent;
  let fixture: ComponentFixture<SickSlipDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SickSlipDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SickSlipDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

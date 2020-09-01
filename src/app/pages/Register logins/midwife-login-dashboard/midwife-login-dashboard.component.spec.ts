import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MidwifeLoginDashboardComponent } from './midwife-login-dashboard.component';

describe('MidwifeLoginDashboardComponent', () => {
  let component: MidwifeLoginDashboardComponent;
  let fixture: ComponentFixture<MidwifeLoginDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MidwifeLoginDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MidwifeLoginDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionistLoginDashboardComponent } from './receptionist-login-dashboard.component';

describe('ReceptionistLoginDashboardComponent', () => {
  let component: ReceptionistLoginDashboardComponent;
  let fixture: ComponentFixture<ReceptionistLoginDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceptionistLoginDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceptionistLoginDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

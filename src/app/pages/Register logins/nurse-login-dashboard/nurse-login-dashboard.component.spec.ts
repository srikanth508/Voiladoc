import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseLoginDashboardComponent } from './nurse-login-dashboard.component';

describe('NurseLoginDashboardComponent', () => {
  let component: NurseLoginDashboardComponent;
  let fixture: ComponentFixture<NurseLoginDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NurseLoginDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NurseLoginDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

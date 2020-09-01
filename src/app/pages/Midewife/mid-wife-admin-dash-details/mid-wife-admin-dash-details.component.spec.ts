import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MidWifeAdminDashDetailsComponent } from './mid-wife-admin-dash-details.component';

describe('MidWifeAdminDashDetailsComponent', () => {
  let component: MidWifeAdminDashDetailsComponent;
  let fixture: ComponentFixture<MidWifeAdminDashDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MidWifeAdminDashDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MidWifeAdminDashDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

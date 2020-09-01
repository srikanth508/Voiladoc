import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MidWifeAdminReportsComponent } from './mid-wife-admin-reports.component';

describe('MidWifeAdminReportsComponent', () => {
  let component: MidWifeAdminReportsComponent;
  let fixture: ComponentFixture<MidWifeAdminReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MidWifeAdminReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MidWifeAdminReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

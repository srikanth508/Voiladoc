import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseAdminReportsComponent } from './nurse-admin-reports.component';

describe('NurseAdminReportsComponent', () => {
  let component: NurseAdminReportsComponent;
  let fixture: ComponentFixture<NurseAdminReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NurseAdminReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NurseAdminReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

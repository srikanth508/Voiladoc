import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMidWifeDashComponent } from './admin-mid-wife-dash.component';

describe('AdminMidWifeDashComponent', () => {
  let component: AdminMidWifeDashComponent;
  let fixture: ComponentFixture<AdminMidWifeDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMidWifeDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMidWifeDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

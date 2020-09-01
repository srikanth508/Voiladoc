import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysioAdminDashComponent } from './physio-admin-dash.component';

describe('PhysioAdminDashComponent', () => {
  let component: PhysioAdminDashComponent;
  let fixture: ComponentFixture<PhysioAdminDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhysioAdminDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysioAdminDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

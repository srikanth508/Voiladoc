import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodGroupMasterDashComponent } from './blood-group-master-dash.component';

describe('BloodGroupMasterDashComponent', () => {
  let component: BloodGroupMasterDashComponent;
  let fixture: ComponentFixture<BloodGroupMasterDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodGroupMasterDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodGroupMasterDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

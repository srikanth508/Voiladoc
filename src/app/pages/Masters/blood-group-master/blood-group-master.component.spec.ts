import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodGroupMasterComponent } from './blood-group-master.component';

describe('BloodGroupMasterComponent', () => {
  let component: BloodGroupMasterComponent;
  let fixture: ComponentFixture<BloodGroupMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodGroupMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodGroupMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

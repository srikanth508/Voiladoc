import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityMasterDashComponent } from './facility-master-dash.component';

describe('FacilityMasterDashComponent', () => {
  let component: FacilityMasterDashComponent;
  let fixture: ComponentFixture<FacilityMasterDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacilityMasterDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacilityMasterDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

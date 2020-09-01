import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceMasterDashComponent } from './service-master-dash.component';

describe('ServiceMasterDashComponent', () => {
  let component: ServiceMasterDashComponent;
  let fixture: ComponentFixture<ServiceMasterDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceMasterDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceMasterDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

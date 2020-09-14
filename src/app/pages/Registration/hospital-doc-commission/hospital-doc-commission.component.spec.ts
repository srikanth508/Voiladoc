import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalDocCommissionComponent } from './hospital-doc-commission.component';

describe('HospitalDocCommissionComponent', () => {
  let component: HospitalDocCommissionComponent;
  let fixture: ComponentFixture<HospitalDocCommissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalDocCommissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalDocCommissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

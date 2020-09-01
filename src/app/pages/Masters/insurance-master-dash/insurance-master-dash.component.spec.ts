import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceMasterDashComponent } from './insurance-master-dash.component';

describe('InsuranceMasterDashComponent', () => {
  let component: InsuranceMasterDashComponent;
  let fixture: ComponentFixture<InsuranceMasterDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsuranceMasterDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceMasterDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

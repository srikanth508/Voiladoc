import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalservicesComponent } from './hospitalservices.component';

describe('HospitalservicesComponent', () => {
  let component: HospitalservicesComponent;
  let fixture: ComponentFixture<HospitalservicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalservicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalservicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

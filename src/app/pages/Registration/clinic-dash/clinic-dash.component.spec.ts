import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicDashComponent } from './clinic-dash.component';

describe('ClinicDashComponent', () => {
  let component: ClinicDashComponent;
  let fixture: ComponentFixture<ClinicDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

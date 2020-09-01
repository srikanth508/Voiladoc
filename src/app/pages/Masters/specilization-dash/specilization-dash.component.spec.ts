import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecilizationDashComponent } from './specilization-dash.component';

describe('SpecilizationDashComponent', () => {
  let component: SpecilizationDashComponent;
  let fixture: ComponentFixture<SpecilizationDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecilizationDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecilizationDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

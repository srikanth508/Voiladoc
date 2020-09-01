import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentDashComponent } from './treatment-dash.component';

describe('TreatmentDashComponent', () => {
  let component: TreatmentDashComponent;
  let fixture: ComponentFixture<TreatmentDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreatmentDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreatmentDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

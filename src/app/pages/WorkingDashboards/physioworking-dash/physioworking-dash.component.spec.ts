import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysioworkingDashComponent } from './physioworking-dash.component';

describe('PhysioworkingDashComponent', () => {
  let component: PhysioworkingDashComponent;
  let fixture: ComponentFixture<PhysioworkingDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhysioworkingDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysioworkingDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysiomonthWiseScheduleComponent } from './physiomonth-wise-schedule.component';

describe('PhysiomonthWiseScheduleComponent', () => {
  let component: PhysiomonthWiseScheduleComponent;
  let fixture: ComponentFixture<PhysiomonthWiseScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhysiomonthWiseScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysiomonthWiseScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

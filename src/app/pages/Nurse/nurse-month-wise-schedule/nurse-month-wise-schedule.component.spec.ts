import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseMonthWiseScheduleComponent } from './nurse-month-wise-schedule.component';

describe('NurseMonthWiseScheduleComponent', () => {
  let component: NurseMonthWiseScheduleComponent;
  let fixture: ComponentFixture<NurseMonthWiseScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NurseMonthWiseScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NurseMonthWiseScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

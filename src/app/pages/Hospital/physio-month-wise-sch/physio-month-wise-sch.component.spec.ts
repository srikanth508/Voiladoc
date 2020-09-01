import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysioMonthWiseSchComponent } from './physio-month-wise-sch.component';

describe('PhysioMonthWiseSchComponent', () => {
  let component: PhysioMonthWiseSchComponent;
  let fixture: ComponentFixture<PhysioMonthWiseSchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhysioMonthWiseSchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysioMonthWiseSchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

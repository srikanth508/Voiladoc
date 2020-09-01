import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MidWifeMonthWiseSchComponent } from './mid-wife-month-wise-sch.component';

describe('MidWifeMonthWiseSchComponent', () => {
  let component: MidWifeMonthWiseSchComponent;
  let fixture: ComponentFixture<MidWifeMonthWiseSchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MidWifeMonthWiseSchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MidWifeMonthWiseSchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

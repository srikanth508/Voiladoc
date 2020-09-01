import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MidwifeMonthWiseComponent } from './midwife-month-wise.component';

describe('MidwifeMonthWiseComponent', () => {
  let component: MidwifeMonthWiseComponent;
  let fixture: ComponentFixture<MidwifeMonthWiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MidwifeMonthWiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MidwifeMonthWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

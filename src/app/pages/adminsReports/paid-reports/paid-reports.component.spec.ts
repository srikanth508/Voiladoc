import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidReportsComponent } from './paid-reports.component';

describe('PaidReportsComponent', () => {
  let component: PaidReportsComponent;
  let fixture: ComponentFixture<PaidReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaidReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaidReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

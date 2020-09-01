import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysioRevenueComponent } from './physio-revenue.component';

describe('PhysioRevenueComponent', () => {
  let component: PhysioRevenueComponent;
  let fixture: ComponentFixture<PhysioRevenueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhysioRevenueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysioRevenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

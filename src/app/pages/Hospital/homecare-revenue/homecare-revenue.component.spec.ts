import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomecareRevenueComponent } from './homecare-revenue.component';

describe('HomecareRevenueComponent', () => {
  let component: HomecareRevenueComponent;
  let fixture: ComponentFixture<HomecareRevenueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomecareRevenueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomecareRevenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

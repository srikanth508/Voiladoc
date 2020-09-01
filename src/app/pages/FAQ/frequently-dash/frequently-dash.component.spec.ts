import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrequentlyDashComponent } from './frequently-dash.component';

describe('FrequentlyDashComponent', () => {
  let component: FrequentlyDashComponent;
  let fixture: ComponentFixture<FrequentlyDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrequentlyDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrequentlyDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

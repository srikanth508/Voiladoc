import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndependentSubscriptionsComponent } from './independent-subscriptions.component';

describe('IndependentSubscriptionsComponent', () => {
  let component: IndependentSubscriptionsComponent;
  let fixture: ComponentFixture<IndependentSubscriptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndependentSubscriptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndependentSubscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

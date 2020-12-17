import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyCompletedTicketsComponent } from './pharmacy-completed-tickets.component';

describe('PharmacyCompletedTicketsComponent', () => {
  let component: PharmacyCompletedTicketsComponent;
  let fixture: ComponentFixture<PharmacyCompletedTicketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PharmacyCompletedTicketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacyCompletedTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysioCompletedTicketsComponent } from './physio-completed-tickets.component';

describe('PhysioCompletedTicketsComponent', () => {
  let component: PhysioCompletedTicketsComponent;
  let fixture: ComponentFixture<PhysioCompletedTicketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhysioCompletedTicketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysioCompletedTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

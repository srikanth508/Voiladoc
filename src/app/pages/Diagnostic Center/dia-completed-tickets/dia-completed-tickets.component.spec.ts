import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaCompletedTicketsComponent } from './dia-completed-tickets.component';

describe('DiaCompletedTicketsComponent', () => {
  let component: DiaCompletedTicketsComponent;
  let fixture: ComponentFixture<DiaCompletedTicketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiaCompletedTicketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiaCompletedTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

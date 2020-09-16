import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MidwifeCompletedTicketsComponent } from './midwife-completed-tickets.component';

describe('MidwifeCompletedTicketsComponent', () => {
  let component: MidwifeCompletedTicketsComponent;
  let fixture: ComponentFixture<MidwifeCompletedTicketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MidwifeCompletedTicketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MidwifeCompletedTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

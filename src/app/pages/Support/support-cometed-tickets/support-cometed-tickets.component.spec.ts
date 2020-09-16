import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportCometedTicketsComponent } from './support-cometed-tickets.component';

describe('SupportCometedTicketsComponent', () => {
  let component: SupportCometedTicketsComponent;
  let fixture: ComponentFixture<SupportCometedTicketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupportCometedTicketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportCometedTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

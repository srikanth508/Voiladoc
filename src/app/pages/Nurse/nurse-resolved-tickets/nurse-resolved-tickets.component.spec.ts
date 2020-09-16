import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseResolvedTicketsComponent } from './nurse-resolved-tickets.component';

describe('NurseResolvedTicketsComponent', () => {
  let component: NurseResolvedTicketsComponent;
  let fixture: ComponentFixture<NurseResolvedTicketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NurseResolvedTicketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NurseResolvedTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

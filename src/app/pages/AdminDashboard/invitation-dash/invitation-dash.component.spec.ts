import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationDashComponent } from './invitation-dash.component';

describe('InvitationDashComponent', () => {
  let component: InvitationDashComponent;
  let fixture: ComponentFixture<InvitationDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvitationDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitationDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

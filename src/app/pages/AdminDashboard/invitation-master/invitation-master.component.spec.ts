import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationMasterComponent } from './invitation-master.component';

describe('InvitationMasterComponent', () => {
  let component: InvitationMasterComponent;
  let fixture: ComponentFixture<InvitationMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvitationMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitationMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

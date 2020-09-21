import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseNotificationsComponent } from './nurse-notifications.component';

describe('NurseNotificationsComponent', () => {
  let component: NurseNotificationsComponent;
  let fixture: ComponentFixture<NurseNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NurseNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NurseNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

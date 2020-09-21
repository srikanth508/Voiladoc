import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysioNotificationComponent } from './physio-notification.component';

describe('PhysioNotificationComponent', () => {
  let component: PhysioNotificationComponent;
  let fixture: ComponentFixture<PhysioNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhysioNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysioNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

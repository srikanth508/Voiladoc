import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailDashComponent } from './email-dash.component';

describe('EmailDashComponent', () => {
  let component: EmailDashComponent;
  let fixture: ComponentFixture<EmailDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

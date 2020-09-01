import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhaPatientChatComponent } from './pha-patient-chat.component';

describe('PhaPatientChatComponent', () => {
  let component: PhaPatientChatComponent;
  let fixture: ComponentFixture<PhaPatientChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhaPatientChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhaPatientChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

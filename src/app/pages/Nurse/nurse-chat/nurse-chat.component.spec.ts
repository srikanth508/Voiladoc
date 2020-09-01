import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseChatComponent } from './nurse-chat.component';

describe('NurseChatComponent', () => {
  let component: NurseChatComponent;
  let fixture: ComponentFixture<NurseChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NurseChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NurseChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

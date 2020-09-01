import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhenToConsumeComponent } from './when-to-consume.component';

describe('WhenToConsumeComponent', () => {
  let component: WhenToConsumeComponent;
  let fixture: ComponentFixture<WhenToConsumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhenToConsumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhenToConsumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

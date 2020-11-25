import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseCancelledAppComponent } from './nurse-cancelled-app.component';

describe('NurseCancelledAppComponent', () => {
  let component: NurseCancelledAppComponent;
  let fixture: ComponentFixture<NurseCancelledAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NurseCancelledAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NurseCancelledAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelationTimingsComponent } from './cancelation-timings.component';

describe('CancelationTimingsComponent', () => {
  let component: CancelationTimingsComponent;
  let fixture: ComponentFixture<CancelationTimingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelationTimingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelationTimingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

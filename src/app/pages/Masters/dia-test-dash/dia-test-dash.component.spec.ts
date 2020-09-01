import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaTestDashComponent } from './dia-test-dash.component';

describe('DiaTestDashComponent', () => {
  let component: DiaTestDashComponent;
  let fixture: ComponentFixture<DiaTestDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiaTestDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiaTestDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

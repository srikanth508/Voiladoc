import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticTestDashComponent } from './diagnostic-test-dash.component';

describe('DiagnosticTestDashComponent', () => {
  let component: DiagnosticTestDashComponent;
  let fixture: ComponentFixture<DiagnosticTestDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagnosticTestDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticTestDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

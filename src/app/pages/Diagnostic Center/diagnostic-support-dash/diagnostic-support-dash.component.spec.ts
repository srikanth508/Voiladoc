import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticSupportDashComponent } from './diagnostic-support-dash.component';

describe('DiagnosticSupportDashComponent', () => {
  let component: DiagnosticSupportDashComponent;
  let fixture: ComponentFixture<DiagnosticSupportDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagnosticSupportDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticSupportDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

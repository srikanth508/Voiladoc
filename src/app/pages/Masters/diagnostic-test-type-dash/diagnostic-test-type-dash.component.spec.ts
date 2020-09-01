import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticTestTypeDashComponent } from './diagnostic-test-type-dash.component';

describe('DiagnosticTestTypeDashComponent', () => {
  let component: DiagnosticTestTypeDashComponent;
  let fixture: ComponentFixture<DiagnosticTestTypeDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagnosticTestTypeDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticTestTypeDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

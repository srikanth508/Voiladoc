import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticPackageDashComponent } from './diagnostic-package-dash.component';

describe('DiagnosticPackageDashComponent', () => {
  let component: DiagnosticPackageDashComponent;
  let fixture: ComponentFixture<DiagnosticPackageDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagnosticPackageDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticPackageDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

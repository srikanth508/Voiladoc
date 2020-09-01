import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticpackageComponent } from './diagnosticpackage.component';

describe('DiagnosticpackageComponent', () => {
  let component: DiagnosticpackageComponent;
  let fixture: ComponentFixture<DiagnosticpackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagnosticpackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticpackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

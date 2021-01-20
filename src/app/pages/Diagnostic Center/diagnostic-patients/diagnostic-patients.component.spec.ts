import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticPatientsComponent } from './diagnostic-patients.component';

describe('DiagnosticPatientsComponent', () => {
  let component: DiagnosticPatientsComponent;
  let fixture: ComponentFixture<DiagnosticPatientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagnosticPatientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticTestTypeComponent } from './diagnostic-test-type.component';

describe('DiagnosticTestTypeComponent', () => {
  let component: DiagnosticTestTypeComponent;
  let fixture: ComponentFixture<DiagnosticTestTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagnosticTestTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticTestTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

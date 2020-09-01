import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticsregistrationComponent } from './diagnosticsregistration.component';

describe('DiagnosticsregistrationComponent', () => {
  let component: DiagnosticsregistrationComponent;
  let fixture: ComponentFixture<DiagnosticsregistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagnosticsregistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticsregistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

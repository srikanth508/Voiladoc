import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDiagnosticRegistrationComponent } from './edit-diagnostic-registration.component';

describe('EditDiagnosticRegistrationComponent', () => {
  let component: EditDiagnosticRegistrationComponent;
  let fixture: ComponentFixture<EditDiagnosticRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDiagnosticRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDiagnosticRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

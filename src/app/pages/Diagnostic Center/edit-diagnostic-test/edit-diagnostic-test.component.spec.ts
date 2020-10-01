import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDiagnosticTestComponent } from './edit-diagnostic-test.component';

describe('EditDiagnosticTestComponent', () => {
  let component: EditDiagnosticTestComponent;
  let fixture: ComponentFixture<EditDiagnosticTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDiagnosticTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDiagnosticTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

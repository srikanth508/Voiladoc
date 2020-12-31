import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDiagnosticCalenderComponent } from './all-diagnostic-calender.component';

describe('AllDiagnosticCalenderComponent', () => {
  let component: AllDiagnosticCalenderComponent;
  let fixture: ComponentFixture<AllDiagnosticCalenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllDiagnosticCalenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllDiagnosticCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

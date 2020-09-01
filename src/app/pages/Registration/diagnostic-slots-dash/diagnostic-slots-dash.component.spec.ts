import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticSlotsDashComponent } from './diagnostic-slots-dash.component';

describe('DiagnosticSlotsDashComponent', () => {
  let component: DiagnosticSlotsDashComponent;
  let fixture: ComponentFixture<DiagnosticSlotsDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagnosticSlotsDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticSlotsDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

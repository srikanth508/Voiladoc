import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticcenterslotsComponent } from './diagnosticcenterslots.component';

describe('DiagnosticcenterslotsComponent', () => {
  let component: DiagnosticcenterslotsComponent;
  let fixture: ComponentFixture<DiagnosticcenterslotsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagnosticcenterslotsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticcenterslotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

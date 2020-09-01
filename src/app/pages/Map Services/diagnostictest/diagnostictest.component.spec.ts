import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnostictestComponent } from './diagnostictest.component';

describe('DiagnostictestComponent', () => {
  let component: DiagnostictestComponent;
  let fixture: ComponentFixture<DiagnostictestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagnostictestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnostictestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

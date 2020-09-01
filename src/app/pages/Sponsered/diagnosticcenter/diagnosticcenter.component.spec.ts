import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticcenterComponent } from './diagnosticcenter.component';

describe('DiagnosticcenterComponent', () => {
  let component: DiagnosticcenterComponent;
  let fixture: ComponentFixture<DiagnosticcenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagnosticcenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticcenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

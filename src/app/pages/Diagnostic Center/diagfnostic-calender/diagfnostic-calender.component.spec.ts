import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagfnosticCalenderComponent } from './diagfnostic-calender.component';

describe('DiagfnosticCalenderComponent', () => {
  let component: DiagfnosticCalenderComponent;
  let fixture: ComponentFixture<DiagfnosticCalenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagfnosticCalenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagfnosticCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

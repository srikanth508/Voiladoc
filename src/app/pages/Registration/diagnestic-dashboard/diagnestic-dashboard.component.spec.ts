import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnesticDashboardComponent } from './diagnestic-dashboard.component';

describe('DiagnesticDashboardComponent', () => {
  let component: DiagnesticDashboardComponent;
  let fixture: ComponentFixture<DiagnesticDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagnesticDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnesticDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

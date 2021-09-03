import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolvedPatientTicketsComponent } from './resolved-patient-tickets.component';

describe('ResolvedPatientTicketsComponent', () => {
  let component: ResolvedPatientTicketsComponent;
  let fixture: ComponentFixture<ResolvedPatientTicketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResolvedPatientTicketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResolvedPatientTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysiotherapistWorkingDetailsComponent } from './physiotherapist-working-details.component';

describe('PhysiotherapistWorkingDetailsComponent', () => {
  let component: PhysiotherapistWorkingDetailsComponent;
  let fixture: ComponentFixture<PhysiotherapistWorkingDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhysiotherapistWorkingDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysiotherapistWorkingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

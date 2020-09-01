import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysiotherapistTimingsComponent } from './physiotherapist-timings.component';

describe('PhysiotherapistTimingsComponent', () => {
  let component: PhysiotherapistTimingsComponent;
  let fixture: ComponentFixture<PhysiotherapistTimingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhysiotherapistTimingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysiotherapistTimingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

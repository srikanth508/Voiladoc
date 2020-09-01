import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseTimingsComponent } from './nurse-timings.component';

describe('NurseTimingsComponent', () => {
  let component: NurseTimingsComponent;
  let fixture: ComponentFixture<NurseTimingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NurseTimingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NurseTimingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseWorkingDetailsComponent } from './nurse-working-details.component';

describe('NurseWorkingDetailsComponent', () => {
  let component: NurseWorkingDetailsComponent;
  let fixture: ComponentFixture<NurseWorkingDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NurseWorkingDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NurseWorkingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

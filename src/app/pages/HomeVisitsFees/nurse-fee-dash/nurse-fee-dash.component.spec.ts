import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseFeeDashComponent } from './nurse-fee-dash.component';

describe('NurseFeeDashComponent', () => {
  let component: NurseFeeDashComponent;
  let fixture: ComponentFixture<NurseFeeDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NurseFeeDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NurseFeeDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

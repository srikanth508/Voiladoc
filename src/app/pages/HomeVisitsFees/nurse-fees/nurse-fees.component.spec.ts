import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseFeesComponent } from './nurse-fees.component';

describe('NurseFeesComponent', () => {
  let component: NurseFeesComponent;
  let fixture: ComponentFixture<NurseFeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NurseFeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NurseFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

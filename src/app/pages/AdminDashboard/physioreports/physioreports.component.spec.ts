import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysioreportsComponent } from './physioreports.component';

describe('PhysioreportsComponent', () => {
  let component: PhysioreportsComponent;
  let fixture: ComponentFixture<PhysioreportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhysioreportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysioreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysiotherapistLoginComponent } from './physiotherapist-login.component';

describe('PhysiotherapistLoginComponent', () => {
  let component: PhysiotherapistLoginComponent;
  let fixture: ComponentFixture<PhysiotherapistLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhysiotherapistLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysiotherapistLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

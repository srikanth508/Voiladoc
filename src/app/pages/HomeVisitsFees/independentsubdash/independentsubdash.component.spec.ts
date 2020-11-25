import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndependentsubdashComponent } from './independentsubdash.component';

describe('IndependentsubdashComponent', () => {
  let component: IndependentsubdashComponent;
  let fixture: ComponentFixture<IndependentsubdashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndependentsubdashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndependentsubdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

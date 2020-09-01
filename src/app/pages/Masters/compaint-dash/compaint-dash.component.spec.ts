import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaintDashComponent } from './compaint-dash.component';

describe('CompaintDashComponent', () => {
  let component: CompaintDashComponent;
  let fixture: ComponentFixture<CompaintDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompaintDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompaintDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

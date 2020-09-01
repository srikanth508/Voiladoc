import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentDashComponent } from './department-dash.component';

describe('DepartmentDashComponent', () => {
  let component: DepartmentDashComponent;
  let fixture: ComponentFixture<DepartmentDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

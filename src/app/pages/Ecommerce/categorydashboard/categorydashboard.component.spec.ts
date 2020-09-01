import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorydashboardComponent } from './categorydashboard.component';

describe('CategorydashboardComponent', () => {
  let component: CategorydashboardComponent;
  let fixture: ComponentFixture<CategorydashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategorydashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorydashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

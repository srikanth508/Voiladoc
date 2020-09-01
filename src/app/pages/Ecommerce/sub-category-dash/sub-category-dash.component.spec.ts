import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCategoryDashComponent } from './sub-category-dash.component';

describe('SubCategoryDashComponent', () => {
  let component: SubCategoryDashComponent;
  let fixture: ComponentFixture<SubCategoryDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubCategoryDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubCategoryDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

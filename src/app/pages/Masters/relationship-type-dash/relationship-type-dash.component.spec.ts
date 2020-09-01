import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationshipTypeDashComponent } from './relationship-type-dash.component';

describe('RelationshipTypeDashComponent', () => {
  let component: RelationshipTypeDashComponent;
  let fixture: ComponentFixture<RelationshipTypeDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelationshipTypeDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelationshipTypeDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

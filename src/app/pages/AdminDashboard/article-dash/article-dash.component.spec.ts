import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleDashComponent } from './article-dash.component';

describe('ArticleDashComponent', () => {
  let component: ArticleDashComponent;
  let fixture: ComponentFixture<ArticleDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

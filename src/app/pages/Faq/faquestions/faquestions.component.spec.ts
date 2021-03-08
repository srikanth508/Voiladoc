import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FAQuestionsComponent } from './faquestions.component';

describe('FAQuestionsComponent', () => {
  let component: FAQuestionsComponent;
  let fixture: ComponentFixture<FAQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FAQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FAQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

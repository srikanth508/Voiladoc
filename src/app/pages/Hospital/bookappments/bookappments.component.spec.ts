import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookappmentsComponent } from './bookappments.component';

describe('BookappmentsComponent', () => {
  let component: BookappmentsComponent;
  let fixture: ComponentFixture<BookappmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookappmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookappmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

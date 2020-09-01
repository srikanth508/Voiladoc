import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDoctorsComponent } from './book-doctors.component';

describe('BookDoctorsComponent', () => {
  let component: BookDoctorsComponent;
  let fixture: ComponentFixture<BookDoctorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookDoctorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDoctorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

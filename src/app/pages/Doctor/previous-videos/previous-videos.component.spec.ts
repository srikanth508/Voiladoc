import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousVideosComponent } from './previous-videos.component';

describe('PreviousVideosComponent', () => {
  let component: PreviousVideosComponent;
  let fixture: ComponentFixture<PreviousVideosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviousVideosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviousVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

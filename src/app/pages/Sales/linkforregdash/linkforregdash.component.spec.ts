import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkforregdashComponent } from './linkforregdash.component';

describe('LinkforregdashComponent', () => {
  let component: LinkforregdashComponent;
  let fixture: ComponentFixture<LinkforregdashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkforregdashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkforregdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

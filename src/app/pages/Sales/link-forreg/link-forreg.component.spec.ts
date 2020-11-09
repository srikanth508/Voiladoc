import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkForregComponent } from './link-forreg.component';

describe('LinkForregComponent', () => {
  let component: LinkForregComponent;
  let fixture: ComponentFixture<LinkForregComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkForregComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkForregComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

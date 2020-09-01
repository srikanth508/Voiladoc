import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocCalenderComponent } from './doc-calender.component';

describe('DocCalenderComponent', () => {
  let component: DocCalenderComponent;
  let fixture: ComponentFixture<DocCalenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocCalenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocREportsComponent } from './doc-reports.component';

describe('DocREportsComponent', () => {
  let component: DocREportsComponent;
  let fixture: ComponentFixture<DocREportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocREportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocREportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

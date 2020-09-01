import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocAppReportsComponent } from './doc-app-reports.component';

describe('DocAppReportsComponent', () => {
  let component: DocAppReportsComponent;
  let fixture: ComponentFixture<DocAppReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocAppReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocAppReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

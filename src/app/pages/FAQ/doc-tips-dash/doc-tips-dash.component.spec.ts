import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocTipsDashComponent } from './doc-tips-dash.component';

describe('DocTipsDashComponent', () => {
  let component: DocTipsDashComponent;
  let fixture: ComponentFixture<DocTipsDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocTipsDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocTipsDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

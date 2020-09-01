import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocWorkingDashComponent } from './doc-working-dash.component';

describe('DocWorkingDashComponent', () => {
  let component: DocWorkingDashComponent;
  let fixture: ComponentFixture<DocWorkingDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocWorkingDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocWorkingDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

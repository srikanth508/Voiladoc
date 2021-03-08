import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickGuideDashComponent } from './quick-guide-dash.component';

describe('QuickGuideDashComponent', () => {
  let component: QuickGuideDashComponent;
  let fixture: ComponentFixture<QuickGuideDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickGuideDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickGuideDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

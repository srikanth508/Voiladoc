import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocDashboardDetailsComponent } from './doc-dashboard-details.component';

describe('DocDashboardDetailsComponent', () => {
  let component: DocDashboardDetailsComponent;
  let fixture: ComponentFixture<DocDashboardDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocDashboardDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocDashboardDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

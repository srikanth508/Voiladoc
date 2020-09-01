import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPageSponsorshipDashboardComponent } from './app-page-sponsorship-dashboard.component';

describe('AppPageSponsorshipDashboardComponent', () => {
  let component: AppPageSponsorshipDashboardComponent;
  let fixture: ComponentFixture<AppPageSponsorshipDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppPageSponsorshipDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppPageSponsorshipDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

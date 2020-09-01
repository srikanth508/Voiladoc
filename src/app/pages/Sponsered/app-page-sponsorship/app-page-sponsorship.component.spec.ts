import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPageSponsorshipComponent } from './app-page-sponsorship.component';

describe('AppPageSponsorshipComponent', () => {
  let component: AppPageSponsorshipComponent;
  let fixture: ComponentFixture<AppPageSponsorshipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppPageSponsorshipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppPageSponsorshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

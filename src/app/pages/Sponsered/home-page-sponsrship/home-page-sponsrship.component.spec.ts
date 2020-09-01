import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageSponsrshipComponent } from './home-page-sponsrship.component';

describe('HomePageSponsrshipComponent', () => {
  let component: HomePageSponsrshipComponent;
  let fixture: ComponentFixture<HomePageSponsrshipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePageSponsrshipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageSponsrshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

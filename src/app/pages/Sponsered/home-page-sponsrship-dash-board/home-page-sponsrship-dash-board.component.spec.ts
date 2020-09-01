import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageSponsrshipDashBoardComponent } from './home-page-sponsrship-dash-board.component';

describe('HomePageSponsrshipDashBoardComponent', () => {
  let component: HomePageSponsrshipDashBoardComponent;
  let fixture: ComponentFixture<HomePageSponsrshipDashBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePageSponsrshipDashBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageSponsrshipDashBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

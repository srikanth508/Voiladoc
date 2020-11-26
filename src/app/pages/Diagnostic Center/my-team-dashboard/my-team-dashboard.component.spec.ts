import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTeamDashboardComponent } from './my-team-dashboard.component';

describe('MyTeamDashboardComponent', () => {
  let component: MyTeamDashboardComponent;
  let fixture: ComponentFixture<MyTeamDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTeamDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTeamDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

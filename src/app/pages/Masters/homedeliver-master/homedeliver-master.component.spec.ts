import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomedeliverMasterComponent } from './homedeliver-master.component';

describe('HomedeliverMasterComponent', () => {
  let component: HomedeliverMasterComponent;
  let fixture: ComponentFixture<HomedeliverMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomedeliverMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomedeliverMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomedeliveryFeesComponent } from './homedelivery-fees.component';

describe('HomedeliveryFeesComponent', () => {
  let component: HomedeliveryFeesComponent;
  let fixture: ComponentFixture<HomedeliveryFeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomedeliveryFeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomedeliveryFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

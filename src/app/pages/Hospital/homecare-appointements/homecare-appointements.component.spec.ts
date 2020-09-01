import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomecareAppointementsComponent } from './homecare-appointements.component';

describe('HomecareAppointementsComponent', () => {
  let component: HomecareAppointementsComponent;
  let fixture: ComponentFixture<HomecareAppointementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomecareAppointementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomecareAppointementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

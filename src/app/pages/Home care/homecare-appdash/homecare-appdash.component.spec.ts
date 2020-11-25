import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomecareAppdashComponent } from './homecare-appdash.component';

describe('HomecareAppdashComponent', () => {
  let component: HomecareAppdashComponent;
  let fixture: ComponentFixture<HomecareAppdashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomecareAppdashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomecareAppdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

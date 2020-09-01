import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampDashComponent } from './camp-dash.component';

describe('CampDashComponent', () => {
  let component: CampDashComponent;
  let fixture: ComponentFixture<CampDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

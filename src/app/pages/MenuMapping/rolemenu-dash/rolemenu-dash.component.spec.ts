import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolemenuDashComponent } from './rolemenu-dash.component';

describe('RolemenuDashComponent', () => {
  let component: RolemenuDashComponent;
  let fixture: ComponentFixture<RolemenuDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolemenuDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolemenuDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

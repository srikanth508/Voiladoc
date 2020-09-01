import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryDashComponent } from './country-dash.component';

describe('CountryDashComponent', () => {
  let component: CountryDashComponent;
  let fixture: ComponentFixture<CountryDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

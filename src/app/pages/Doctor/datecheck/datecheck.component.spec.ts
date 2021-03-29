import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatecheckComponent } from './datecheck.component';

describe('DatecheckComponent', () => {
  let component: DatecheckComponent;
  let fixture: ComponentFixture<DatecheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatecheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatecheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsDashComponent } from './sms-dash.component';

describe('SmsDashComponent', () => {
  let component: SmsDashComponent;
  let fixture: ComponentFixture<SmsDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmsDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

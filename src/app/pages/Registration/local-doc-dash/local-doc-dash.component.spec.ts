import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalDocDashComponent } from './local-doc-dash.component';

describe('LocalDocDashComponent', () => {
  let component: LocalDocDashComponent;
  let fixture: ComponentFixture<LocalDocDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalDocDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalDocDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

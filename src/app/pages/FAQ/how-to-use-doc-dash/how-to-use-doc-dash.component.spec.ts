import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HowToUseDocDashComponent } from './how-to-use-doc-dash.component';

describe('HowToUseDocDashComponent', () => {
  let component: HowToUseDocDashComponent;
  let fixture: ComponentFixture<HowToUseDocDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HowToUseDocDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HowToUseDocDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

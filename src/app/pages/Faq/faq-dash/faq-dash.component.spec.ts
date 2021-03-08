import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqDashComponent } from './faq-dash.component';

describe('FaqDashComponent', () => {
  let component: FaqDashComponent;
  let fixture: ComponentFixture<FaqDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaqDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

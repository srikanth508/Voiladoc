import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecpsupportDashComponent } from './recpsupport-dash.component';

describe('RecpsupportDashComponent', () => {
  let component: RecpsupportDashComponent;
  let fixture: ComponentFixture<RecpsupportDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecpsupportDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecpsupportDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MidwifeFeesDashComponent } from './midwife-fees-dash.component';

describe('MidwifeFeesDashComponent', () => {
  let component: MidwifeFeesDashComponent;
  let fixture: ComponentFixture<MidwifeFeesDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MidwifeFeesDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MidwifeFeesDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

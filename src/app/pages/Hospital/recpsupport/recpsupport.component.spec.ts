import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecpsupportComponent } from './recpsupport.component';

describe('RecpsupportComponent', () => {
  let component: RecpsupportComponent;
  let fixture: ComponentFixture<RecpsupportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecpsupportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecpsupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

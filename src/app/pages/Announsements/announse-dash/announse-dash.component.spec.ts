import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnounseDashComponent } from './announse-dash.component';

describe('AnnounseDashComponent', () => {
  let component: AnnounseDashComponent;
  let fixture: ComponentFixture<AnnounseDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnounseDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnounseDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvincedashComponent } from './provincedash.component';

describe('ProvincedashComponent', () => {
  let component: ProvincedashComponent;
  let fixture: ComponentFixture<ProvincedashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvincedashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvincedashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

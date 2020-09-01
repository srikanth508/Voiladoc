import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmdashComponent } from './pharmdash.component';

describe('PharmdashComponent', () => {
  let component: PharmdashComponent;
  let fixture: ComponentFixture<PharmdashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PharmdashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

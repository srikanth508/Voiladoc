import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HspdashComponent } from './hspdash.component';

describe('HspdashComponent', () => {
  let component: HspdashComponent;
  let fixture: ComponentFixture<HspdashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HspdashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HspdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

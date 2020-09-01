import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HspclidashComponent } from './hspclidash.component';

describe('HspclidashComponent', () => {
  let component: HspclidashComponent;
  let fixture: ComponentFixture<HspclidashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HspclidashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HspclidashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

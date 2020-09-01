import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrequentlyaskedComponent } from './frequentlyasked.component';

describe('FrequentlyaskedComponent', () => {
  let component: FrequentlyaskedComponent;
  let fixture: ComponentFixture<FrequentlyaskedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrequentlyaskedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrequentlyaskedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

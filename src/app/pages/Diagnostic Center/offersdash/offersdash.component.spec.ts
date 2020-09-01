import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffersdashComponent } from './offersdash.component';

describe('OffersdashComponent', () => {
  let component: OffersdashComponent;
  let fixture: ComponentFixture<OffersdashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffersdashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffersdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SponserpharmacyComponent } from './sponserpharmacy.component';

describe('SponserpharmacyComponent', () => {
  let component: SponserpharmacyComponent;
  let fixture: ComponentFixture<SponserpharmacyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SponserpharmacyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SponserpharmacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

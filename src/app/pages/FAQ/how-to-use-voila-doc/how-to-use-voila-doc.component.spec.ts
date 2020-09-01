import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HowToUseVoilaDOcComponent } from './how-to-use-voila-doc.component';

describe('HowToUseVoilaDOcComponent', () => {
  let component: HowToUseVoilaDOcComponent;
  let fixture: ComponentFixture<HowToUseVoilaDOcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HowToUseVoilaDOcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HowToUseVoilaDOcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

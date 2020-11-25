import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelledmidwifeAppsComponent } from './cancelledmidwife-apps.component';

describe('CancelledmidwifeAppsComponent', () => {
  let component: CancelledmidwifeAppsComponent;
  let fixture: ComponentFixture<CancelledmidwifeAppsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelledmidwifeAppsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelledmidwifeAppsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

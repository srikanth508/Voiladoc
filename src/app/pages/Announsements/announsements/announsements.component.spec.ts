import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnounsementsComponent } from './announsements.component';

describe('AnnounsementsComponent', () => {
  let component: AnnounsementsComponent;
  let fixture: ComponentFixture<AnnounsementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnounsementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnounsementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueDetailsComponent } from './revenue-details.component';

describe('RevenueDetailsComponent', () => {
  let component: RevenueDetailsComponent;
  let fixture: ComponentFixture<RevenueDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevenueDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenueDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

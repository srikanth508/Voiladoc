import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MideWifeReportsComponent } from './mide-wife-reports.component';

describe('MideWifeReportsComponent', () => {
  let component: MideWifeReportsComponent;
  let fixture: ComponentFixture<MideWifeReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MideWifeReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MideWifeReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

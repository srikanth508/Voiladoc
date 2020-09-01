import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountrtMasterComponent } from './countrt-master.component';

describe('CountrtMasterComponent', () => {
  let component: CountrtMasterComponent;
  let fixture: ComponentFixture<CountrtMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountrtMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountrtMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

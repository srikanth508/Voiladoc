import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvinceMasterComponent } from './province-master.component';

describe('ProvinceMasterComponent', () => {
  let component: ProvinceMasterComponent;
  let fixture: ComponentFixture<ProvinceMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvinceMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvinceMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

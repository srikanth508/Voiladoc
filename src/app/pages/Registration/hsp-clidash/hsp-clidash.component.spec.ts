import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HspClidashComponent } from './hsp-clidash.component';

describe('HspClidashComponent', () => {
  let component: HspClidashComponent;
  let fixture: ComponentFixture<HspClidashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HspClidashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HspClidashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

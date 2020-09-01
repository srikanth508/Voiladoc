import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportProfileComponent } from './support-profile.component';

describe('SupportProfileComponent', () => {
  let component: SupportProfileComponent;
  let fixture: ComponentFixture<SupportProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupportProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

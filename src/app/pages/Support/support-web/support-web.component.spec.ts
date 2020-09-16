import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportWebComponent } from './support-web.component';

describe('SupportWebComponent', () => {
  let component: SupportWebComponent;
  let fixture: ComponentFixture<SupportWebComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupportWebComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

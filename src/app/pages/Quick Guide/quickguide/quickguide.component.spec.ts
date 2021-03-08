import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickguideComponent } from './quickguide.component';

describe('QuickguideComponent', () => {
  let component: QuickguideComponent;
  let fixture: ComponentFixture<QuickguideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickguideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickguideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

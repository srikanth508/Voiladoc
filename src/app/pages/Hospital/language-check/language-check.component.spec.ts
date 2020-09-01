import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageCheckComponent } from './language-check.component';

describe('LanguageCheckComponent', () => {
  let component: LanguageCheckComponent;
  let fixture: ComponentFixture<LanguageCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanguageCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

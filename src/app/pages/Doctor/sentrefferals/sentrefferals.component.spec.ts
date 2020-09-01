import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SentrefferalsComponent } from './sentrefferals.component';

describe('SentrefferalsComponent', () => {
  let component: SentrefferalsComponent;
  let fixture: ComponentFixture<SentrefferalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SentrefferalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SentrefferalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

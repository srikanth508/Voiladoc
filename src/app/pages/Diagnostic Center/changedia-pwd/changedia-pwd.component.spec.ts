import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangediaPwdComponent } from './changedia-pwd.component';

describe('ChangediaPwdComponent', () => {
  let component: ChangediaPwdComponent;
  let fixture: ComponentFixture<ChangediaPwdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangediaPwdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangediaPwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

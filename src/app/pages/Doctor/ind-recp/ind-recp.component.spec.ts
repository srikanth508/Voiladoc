import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndRecpComponent } from './ind-recp.component';

describe('IndRecpComponent', () => {
  let component: IndRecpComponent;
  let fixture: ComponentFixture<IndRecpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndRecpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndRecpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

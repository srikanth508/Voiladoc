import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndRecpdashComponent } from './ind-recpdash.component';

describe('IndRecpdashComponent', () => {
  let component: IndRecpdashComponent;
  let fixture: ComponentFixture<IndRecpdashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndRecpdashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndRecpdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

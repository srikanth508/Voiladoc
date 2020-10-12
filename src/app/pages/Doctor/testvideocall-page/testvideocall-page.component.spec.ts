import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestvideocallPageComponent } from './testvideocall-page.component';

describe('TestvideocallPageComponent', () => {
  let component: TestvideocallPageComponent;
  let fixture: ComponentFixture<TestvideocallPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestvideocallPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestvideocallPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

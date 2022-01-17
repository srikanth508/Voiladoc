import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoldersDashComponent } from './folders-dash.component';

describe('FoldersDashComponent', () => {
  let component: FoldersDashComponent;
  let fixture: ComponentFixture<FoldersDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoldersDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoldersDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

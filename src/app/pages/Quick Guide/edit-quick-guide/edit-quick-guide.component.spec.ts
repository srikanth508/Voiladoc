import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditQuickGuideComponent } from './edit-quick-guide.component';

describe('EditQuickGuideComponent', () => {
  let component: EditQuickGuideComponent;
  let fixture: ComponentFixture<EditQuickGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditQuickGuideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditQuickGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoiladocRegisteredUsersComponent } from './voiladoc-registered-users.component';

describe('VoiladocRegisteredUsersComponent', () => {
  let component: VoiladocRegisteredUsersComponent;
  let fixture: ComponentFixture<VoiladocRegisteredUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoiladocRegisteredUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoiladocRegisteredUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

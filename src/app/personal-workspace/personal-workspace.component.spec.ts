import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalWorkspaceComponent } from './personal-workspace.component';

describe('PersonalWorkspaceComponent', () => {
  let component: PersonalWorkspaceComponent;
  let fixture: ComponentFixture<PersonalWorkspaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalWorkspaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

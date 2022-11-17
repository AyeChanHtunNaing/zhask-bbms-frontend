import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedWorkspaceComponent } from './shared-workspace.component';

describe('SharedWorkspaceComponent', () => {
  let component: SharedWorkspaceComponent;
  let fixture: ComponentFixture<SharedWorkspaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedWorkspaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
